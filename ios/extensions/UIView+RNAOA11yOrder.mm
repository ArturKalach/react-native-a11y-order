//
//  UIView+RNAOA11yOrder.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 21/10/2025.
//

#import <Foundation/Foundation.h>

#import "UIView+RNAOA11yOrder.h"
#import "RNAOSwizzleInstanceMethod.h"
#import <objc/runtime.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#else
#import <React/RCTView.h>
#endif

static char kRNAOScreenReaderFocusDelegate;

@implementation UIView (RNAOA11yOrder)

- (void)setScreenReaderFocusDelegate:(id<RNAOScreenReaderFocusDelegate>)focusDelegate {
  objc_setAssociatedObject(self, &kRNAOScreenReaderFocusDelegate, focusDelegate, OBJC_ASSOCIATION_ASSIGN);
}

- (void)clearScreenReaderFocusDelegate {
  objc_setAssociatedObject(self, &kRNAOScreenReaderFocusDelegate, nil, OBJC_ASSOCIATION_ASSIGN);
}

- (id<RNAOScreenReaderFocusDelegate>)getScreenReaderFocusDelegate {
  @try {
    return objc_getAssociatedObject(self, &kRNAOScreenReaderFocusDelegate);
  } @catch (NSException *exception) {
    return nil;
  }
}

- (void)trigerScreenReaderFocusDelegate:(BOOL)focused {
  id<RNAOScreenReaderFocusDelegate> delegate = [self getScreenReaderFocusDelegate];
  if (delegate && [delegate respondsToSelector:@selector(onScreenReaderFocusChanged:)]) {
    [delegate onScreenReaderFocusChanged: focused];
  }
}


+ (void)load {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    #ifdef RCT_NEW_ARCH_ENABLED
      Class swizzleClass = [RCTViewComponentView class];
    #else
      Class swizzleClass = [RCTView class];
    #endif

    RNAOSwizzleInstanceMethod(
                              swizzleClass,
                              @selector(accessibilityElementDidBecomeFocused),
                              @selector(rnao_accessibilityElementDidBecomeFocused)
                              );
    RNAOSwizzleInstanceMethod(
                              swizzleClass,
                              @selector(accessibilityElementDidLoseFocus),
                              @selector(rnao_accessibilityElementDidLoseFocus)
                              );
  });
}

- (void)rnao_accessibilityElementDidBecomeFocused {
  [self rnao_accessibilityElementDidBecomeFocused];
  [self trigerScreenReaderFocusDelegate: true];
}

- (void)rnao_accessibilityElementDidLoseFocus {
  [self rnao_accessibilityElementDidLoseFocus];
  [self trigerScreenReaderFocusDelegate: false];
}

@end
