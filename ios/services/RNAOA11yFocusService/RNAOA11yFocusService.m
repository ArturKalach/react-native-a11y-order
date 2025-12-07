//
//  RNAOA11yFocusService.m
//  boost-boost_privacy
//
//  Created by Artur Kalach on 04/12/2025.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import "RNAOA11yFocusService.h"

@interface RNAOA11yFocusService ()
@property (nonatomic, weak) UIView *lastFocusedView;
@property (nonatomic, strong) NSHashTable<UIView<RNAOA11yFocusServiceSubscriber> *> *subscribers;
@end

@implementation RNAOA11yFocusService

+ (instancetype)sharedService {
  static RNAOA11yFocusService *service = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    service = [[RNAOA11yFocusService alloc] init];
  });
  return service;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    _subscribers = [NSHashTable weakObjectsHashTable];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(accessibilityElementFocused:)
                                                 name:UIAccessibilityElementFocusedNotification
                                               object:nil];
  }
  return self;
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)subscribe:(UIView<RNAOA11yFocusServiceSubscriber> *)subscriber {
  @synchronized (self) {
    [self.subscribers addObject:subscriber];
  }
}

- (void)unsubscribe:(UIView<RNAOA11yFocusServiceSubscriber> *)subscriber {
  @synchronized (self) {
    [self.subscribers removeObject:subscriber];
  }
}

- (void)accessibilityElementFocused:(NSNotification *)notification {
  @try {
    id focusedElement = notification.userInfo[UIAccessibilityFocusedElementKey];
    if ([focusedElement isKindOfClass:[UIAccessibilityElement class]]) {
      focusedElement = ((UIAccessibilityElement *)focusedElement).accessibilityContainer;
    }
    if (![focusedElement isKindOfClass:[UIView class]]) {
      return;
    }
    if (self.lastFocusedView && self.lastFocusedView != focusedElement) {
      for (UIView<RNAOA11yFocusServiceSubscriber> *subscriber in self.subscribers) {
        if ([self.lastFocusedView isDescendantOfView:subscriber]) {
          [subscriber accessibilityElementDidUnfocused:self.lastFocusedView];
        }
      }
    }
    self.lastFocusedView = focusedElement;
    for (UIView<RNAOA11yFocusServiceSubscriber> *subscriber in self.subscribers) {
      if ([focusedElement isDescendantOfView:subscriber]) {
        [subscriber accessibilityElementDidBecomeFocused:focusedElement];
      }
    }
  }
  @catch (NSException *exception) {
    self.lastFocusedView = nil;
  }
}


@end
