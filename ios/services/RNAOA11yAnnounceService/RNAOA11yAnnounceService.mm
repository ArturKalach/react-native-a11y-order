//
//  RNAOA11yAnnounceService.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 05/12/2025.
//

#import <Foundation/Foundation.h>
#import "RNAOA11yAnnounceService.h"
#import "RNAODebouncer.h"
#import "RNAOA11yAnnounceQueue.h"
#import "RNAOFocusChangeListener.h"
#import "RNAOA11yAnnounceHelper.h"

@interface RNAOA11yAnnounceService ()
@property (nonatomic, assign) BOOL isVoiceOverNulled;
@property (nonatomic, assign) BOOL isAnnounceLocked;
@property (nonatomic, strong) RNAODebouncer *announceDebouncer;
@property (nonatomic, strong) RNAODebouncer *lockReleaseDebouncer;
@property (nonatomic, strong) RNAOA11yAnnounceQueue *announceQueue;
@property (nonatomic, strong) RNAOFocusChangeListener *voiceOverFocusListener;
// One callback per announce:onFired: call (FIFO). Fired when the batch posts.
// Dropped without calling on cancelAll — module resolves those promises as 'cancelled'.
@property (nonatomic, strong) NSMutableArray<dispatch_block_t> *onFiredCallbacks;
@property (nonatomic, assign, readonly) BOOL canAnnounce;
@end

@implementation RNAOA11yAnnounceService

#pragma mark - Singleton

+ (instancetype)shared {
  static RNAOA11yAnnounceService *instance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{ instance = [self new]; });
  return instance;
}

- (instancetype)init {
  if (self = [super init]) {
    _isVoiceOverNulled    = YES;
    _announceDebouncer    = [[RNAODebouncer alloc] initWithInterval:0.3];
    _lockReleaseDebouncer = [[RNAODebouncer alloc] initWithInterval:1.0];
    _announceQueue        = [RNAOA11yAnnounceQueue new];
    _onFiredCallbacks     = [NSMutableArray new];
    _voiceOverFocusListener = [[RNAOFocusChangeListener alloc] initWithDelegate:self];
    [_voiceOverFocusListener startListening];
  }
  return self;
}

- (void)dealloc { [_voiceOverFocusListener stopListening]; }

- (BOOL)canAnnounce {
  return !self.announceQueue.isEmpty && !self.isAnnounceLocked && !self.isVoiceOverNulled;
}

#pragma mark - Focus delegate

- (void)voiceOverFocusChanged:(id)focusedElement {
  self.isVoiceOverNulled = (focusedElement == nil);
  [self _scheduleAnnounce];
}

#pragma mark - Lock

- (void)temporarilyLockAnnounce {
  [self temporarilyLockAnnounce:1.0];
}

- (void)temporarilyLockAnnounce:(NSTimeInterval)interval {
  self.isAnnounceLocked = YES;
  // Interval must be set before debounceAction: — it is read at call time.
  self.lockReleaseDebouncer.debounceInterval = interval;
  __weak RNAOA11yAnnounceService *weakSelf = self;
  [self.lockReleaseDebouncer debounceAction:^{
    weakSelf.isAnnounceLocked = NO;
    [weakSelf _scheduleAnnounce];
  }];
}

#pragma mark - Announce

- (void)announce:(NSString *)announcement {
  [self announce:announcement onFired:nil];
}

- (void)announce:(NSString *)announcement onFired:(nullable dispatch_block_t)onFired {
  [self.announceQueue add:announcement];
  if (onFired) [self.onFiredCallbacks addObject:onFired];
  [self _scheduleAnnounce];
}

- (void)cancelAll {
  [self.announceQueue clear];
  [self.onFiredCallbacks removeAllObjects];
}

#pragma mark - Private

- (void)_scheduleAnnounce {
  if (!self.canAnnounce) return;
  __weak RNAOA11yAnnounceService *weakSelf = self;
  [self.announceDebouncer debounceAction:^{ [weakSelf _announceNow]; }];
}

- (void)_announceNow {
  if (!self.canAnnounce) return;
  [RNAOA11yAnnounceHelper announceWithList:self.announceQueue.list];
  [self.announceQueue clear];
  for (dispatch_block_t cb in self.onFiredCallbacks.copy) { cb(); }
  [self.onFiredCallbacks removeAllObjects];
}

@end
