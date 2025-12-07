//
//  RNAOA11yAnnounceService.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 05/12/2025.
//

#import <Foundation/Foundation.h>
#import "RNAOA11yAnnounceService.h"

@interface RNAOA11yAnnounceService ()

@property (nonatomic, copy) void (^debounceBlock)(void);
@property (nonatomic, strong) NSMutableArray<NSString *> *announceArray;
@property (nonatomic, assign) BOOL isNulled;

@end

@implementation RNAOA11yAnnounceService

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
    _announceArray = [[NSMutableArray alloc] init];
    _isNulled = YES;
    _announceLock = NO;

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleFocusChange:)
                                                 name:UIAccessibilityElementFocusedNotification
                                               object:nil];
  }
  return self;
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (BOOL)getCanBeAnnounced {
  return !_announceLock && !_isNulled && _announceArray.count != 0;
}

- (void)setAnnounceLock:(BOOL)announceLock {
  _announceLock = announceLock;
  
  if([self getCanBeAnnounced]) {
    [self debounceAnnounce];
  }
}


- (void)handleFocusChange:(NSNotification *)notification {
  id focusedElement = notification.userInfo[UIAccessibilityFocusedElementKey];
  _isNulled = (focusedElement == nil);

  if([self getCanBeAnnounced]) {
    [self debounceAnnounce];
  }
}

- (void)postNotification {
  for (NSString *announcement in _announceArray) {
    NSDictionary *attributes = @{ UIAccessibilitySpeechAttributeQueueAnnouncement : @YES };
    
    NSAttributedString *attributedAnnouncement = [[NSAttributedString alloc] initWithString:announcement attributes:attributes];
    
    UIAccessibilityPostNotification(UIAccessibilityAnnouncementNotification, attributedAnnouncement);
  }
  
  [_announceArray removeAllObjects];
}

- (void)debounceAnnounce {
  if(![self getCanBeAnnounced]) return;

  [self debounceWithDelay:0.3 block:^{
    if ([self getCanBeAnnounced]) {
      [self postNotification];
    } else {
      [self debounceAnnounce];
    }
  }];
}

- (void)announce:(NSString *)announcement {
  if (announcement.length == 0) {
    return;
  }
  
  [_announceArray addObject:announcement];
  [self debounceAnnounce];
}

- (void)debounceWithDelay:(NSTimeInterval)delay block:(void (^)(void))block {
    self.debounceBlock = nil;

    __weak RNAOA11yAnnounceService *weakSelf = self;
    self.debounceBlock = ^{
        if (block) {
            block();
        }
    };

    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delay * NSEC_PER_SEC)),
                   dispatch_get_main_queue(), ^{
        if (weakSelf.debounceBlock) {
            weakSelf.debounceBlock();
            weakSelf.debounceBlock = nil;
        }
    });
}

@end
