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

//@property (nonatomic, copy) void (^debounceBlock)(void);

@property (nonatomic, assign) BOOL isVoiceOverNulled;
@property (nonatomic, assign) BOOL isAnnounceLocked;

@property (nonatomic, strong) RNAODebouncer *announceDebouncer;
@property (nonatomic, strong) RNAODebouncer *lockReleaseDebouncer;

@property (nonatomic, strong) RNAOA11yAnnounceQueue *announceQueue;
@property (strong, nonatomic) RNAOFocusChangeListener *voiceOverFocusListener;

@property (nonatomic, assign, readonly) BOOL canAnnounce;

@end

@implementation RNAOA11yAnnounceService

#pragma mark - Singleton
+ (instancetype)shared {
  static RNAOA11yAnnounceService *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [[RNAOA11yAnnounceService alloc] init];
  });
  return sharedInstance;
}

- (instancetype)init {
  if (self) {
    _isVoiceOverNulled = YES;
    
    self.isAnnounceLocked = NO;
    self.announceDebouncer =  [[RNAODebouncer alloc] initWithInterval: 0.3];
    self.lockReleaseDebouncer =  [[RNAODebouncer alloc] initWithInterval: 1];
    self.announceQueue = [[RNAOA11yAnnounceQueue alloc] init];
    
    self.voiceOverFocusListener = [[RNAOFocusChangeListener alloc] initWithDelegate: self];
    [self.voiceOverFocusListener startListening];
  }
  return self;
}

- (void)dealloc {
  [self.voiceOverFocusListener stopListening];
}

- (BOOL)canAnnounce {
  return !self.announceQueue.isEmpty && !self.isAnnounceLocked && !self.isVoiceOverNulled;
}

- (void)voiceOverFocusChanged:(id)focusedElement {
  self.isVoiceOverNulled = (focusedElement == nil);
  
  [self delayedAnnounce];
}

- (void)temporarilyLockAnnounce {
    self.isAnnounceLocked = YES;
    [self.lockReleaseDebouncer debounceAction:^{
        self.isAnnounceLocked = NO;
        [self delayedAnnounce];
    }];
}

- (void)temporarilyLockAnnounce:(NSTimeInterval)interval {
    self.lockReleaseDebouncer.debounceInterval = interval;
    [self temporarilyLockAnnounce];
}


#pragma mark - Announce
- (void)announce:(NSString *)announcement {
  [self.announceQueue add: announcement];
  
  [self delayedAnnounce];
}

- (void)delayedAnnounce {
  if(!self.canAnnounce) return;

  [self.announceDebouncer debounceAction:^{
    [self announceAction];
  }];
}

- (void)announceAction {
  if(self.canAnnounce) {
    [RNAOA11yAnnounceHelper announceWithList: self.announceQueue.list];
    [self.announceQueue clear];
  } else {
    [self delayedAnnounce];
  }
}

@end
