//
//  RNAOA11yAnnounceModule.mm
//  react-native-a11y-order
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "RNAOA11yAnnounceModule.h"
#import "RNAOA11yAnnounceService.h"
#import "RNAOSpeechAttributes.h"

using namespace facebook::react;

// ─────────────────────────────────────────────────────────────────────────────
// MARK: - Pending entry
// ─────────────────────────────────────────────────────────────────────────────

@interface RNAOPendingAnnouncement : NSObject
@property (nonatomic, copy)   RCTPromiseResolveBlock resolve;
@property (nonatomic, copy)   NSString *text;      // for direct-mode finish-notification matching
@property (nonatomic, assign) BOOL isDirect;
@end
@implementation RNAOPendingAnnouncement
@end


// ─────────────────────────────────────────────────────────────────────────────
// MARK: - Private interface
// ─────────────────────────────────────────────────────────────────────────────

@interface RNAOA11yAnnounceModule ()

// Single source of truth: announcementId → entry.
@property (nonatomic, strong) NSMutableDictionary<NSString *, RNAOPendingAnnouncement *> *pending;

// At most one direct announcement is in-flight; pointer into `pending`.
@property (nonatomic, copy, nullable) NSString *currentDirectId;

@end


// ─────────────────────────────────────────────────────────────────────────────
// MARK: - Implementation
// ─────────────────────────────────────────────────────────────────────────────

@implementation RNAOA11yAnnounceModule

+ (BOOL)requiresMainQueueSetup { return YES; }

RCT_EXPORT_MODULE(A11yAnnounceModule);

- (instancetype)init {
    if (self = [super init]) {
        _pending = [NSMutableDictionary new];
        [[NSNotificationCenter defaultCenter]
             addObserver:self
                selector:@selector(_handleAnnouncementFinished:)
                    name:UIAccessibilityAnnouncementDidFinishNotification
                  object:nil];
    }
    return self;
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}


// ─────────────────────────────────────────────────────────────────────────────
// MARK: - announce  (arch-split: C++ struct vs NSDictionary)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * calm: true  — Routes through RNAOA11yAnnounceService (300 ms debounce +
 *               navigation-lock + VoiceOver-state guard). Promise resolves
 *               when the service **actually fires** the announcement, not just
 *               when it is enqueued, so `await` is meaningful.
 *
 * calm: false — Posts via UIAccessibilityPostNotification with speech attrs.
 *               Promise resolves when UIAccessibilityAnnouncementDidFinishNotification
 *               fires ('spoken') or the announcement is interrupted ('fired').
 */
- (void)_announceMessage:(NSString *)message
                     opts:(NSDictionary *)opts
                  resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject
{
    if (!message || [message stringByTrimmingCharactersInSet:
                     [NSCharacterSet whitespaceAndNewlineCharacterSet]].length == 0) {
        message = @"";
    }

    NSString *announcementId = [[NSUUID UUID] UUIDString];
    BOOL calm = [opts[@"calm"] boolValue];

    RNAOPendingAnnouncement *entry = [RNAOPendingAnnouncement new];
    entry.resolve  = resolve;
    entry.text     = message;
    entry.isDirect = !calm;
    self.pending[announcementId] = entry;

    if (calm) {
        __weak RNAOA11yAnnounceModule *weakSelf = self;
        [[RNAOA11yAnnounceService shared] announce:message onFired:^{
            // Guard against cancel:id that already removed the entry — avoids double-resolve.
            [weakSelf _resolveId:announcementId status:@"fired"];
        }];
        return;
    }

    // Direct mode: at most one in-flight; supersede any previous.
    if (self.currentDirectId && ![self.currentDirectId isEqualToString:announcementId]) {
        [self _resolveId:self.currentDirectId status:@"fired"];
    }
    self.currentDirectId = announcementId;

    NSAttributedString *attrStr = [RNAOSpeechAttributes attributedStringFor:message options:opts];
    NSTimeInterval delayMs = [opts[@"delayMs"] doubleValue];

    dispatch_block_t post = ^{
        UIAccessibilityPostNotification(UIAccessibilityAnnouncementNotification, attrStr);
    };

    if (delayMs > 0) {
        dispatch_after(
            dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayMs * NSEC_PER_MSEC)),
            dispatch_get_main_queue(),
            post
        );
    } else {
        dispatch_async(dispatch_get_main_queue(), post);
    }
}


- (void)announce:(NSString *)message
         options:(JS::NativeA11yAnnounceModule::AnnounceOptions &)options
         resolve:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
    NSMutableDictionary *opts = [NSMutableDictionary new];

    if (options.calm().has_value())        opts[@"calm"]        = @(*options.calm());
    if (options.priority())                opts[@"priority"]    = options.priority();
    if (options.queue().has_value())       opts[@"queue"]       = @(*options.queue());
    if (options.delayMs().has_value())     opts[@"delayMs"]     = @(*options.delayMs());
    // Speech options (flat at bridge level, grouped under `speech` in JS API)
    if (options.language())                opts[@"language"]    = options.language();
    if (options.pitch().has_value())       opts[@"pitch"]       = @(*options.pitch());
    if (options.spellOut().has_value())    opts[@"spellOut"]    = @(*options.spellOut());
    if (options.punctuation().has_value()) opts[@"punctuation"] = @(*options.punctuation());
    if (options.ipaNotation())             opts[@"ipaNotation"] = options.ipaNotation();

    [self _announceMessage:message opts:opts resolve:resolve reject:reject];
}


// ─────────────────────────────────────────────────────────────────────────────
// MARK: - cancel / cancelAll
// ─────────────────────────────────────────────────────────────────────────────

RCT_EXPORT_METHOD(cancel:(NSString *)announcementId
                  resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject)
{
    [self _resolveId:announcementId status:@"cancelled"];
    resolve(@{ @"id": announcementId ?: @"", @"status": @"cancelled" });
}

RCT_EXPORT_METHOD(cancelAll:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject)
{
    [[RNAOA11yAnnounceService shared] cancelAll];

    NSDictionary<NSString *, RNAOPendingAnnouncement *> *snapshot = [self.pending copy];
    [self.pending removeAllObjects];
    self.currentDirectId = nil;

    for (NSString *aid in snapshot) {
        snapshot[aid].resolve(@{ @"id": aid, @"status": @"cancelled" });
    }
    resolve(@{ @"id": @"", @"status": @"cancelled" });
}


// ─────────────────────────────────────────────────────────────────────────────
// MARK: - VoiceOver finish notification (direct mode only)
// ─────────────────────────────────────────────────────────────────────────────

- (void)_handleAnnouncementFinished:(NSNotification *)note {
    NSString *directId = self.currentDirectId;
    if (!directId) return;

    RNAOPendingAnnouncement *entry = self.pending[directId];
    if (!entry) return;

    NSString *spokenText = note.userInfo[UIAccessibilityAnnouncementKeyStringValue];
    if (![entry.text isEqualToString:spokenText]) return;

    BOOL wasSuccessful = [note.userInfo[UIAccessibilityAnnouncementKeyWasSuccessful] boolValue];
    [self _resolveId:directId status:wasSuccessful ? @"spoken" : @"fired"];
}


// ─────────────────────────────────────────────────────────────────────────────
// MARK: - Resolve helper
// ─────────────────────────────────────────────────────────────────────────────

- (void)_resolveId:(NSString *)announcementId status:(NSString *)status {
    if (!announcementId) return;
    RNAOPendingAnnouncement *entry = self.pending[announcementId];
    if (!entry) return;

    [self.pending removeObjectForKey:announcementId];
    if ([self.currentDirectId isEqualToString:announcementId]) {
        self.currentDirectId = nil;
    }
    entry.resolve(@{ @"id": announcementId, @"status": status });
}


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeA11yAnnounceModuleSpecJSI>(params);
}

@end
