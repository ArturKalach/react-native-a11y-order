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

@interface RNAOWeakWrapper : NSObject
@property (nonatomic, weak) id value;
@end

@implementation RNAOWeakWrapper
@end

static char kRNAOScreenReaderFocusDelegate;

@implementation UIView (RNAOA11yOrder)

- (void)setScreenReaderFocusDelegate:(id<RNAOScreenReaderFocusDelegate>)focusDelegate {
  RNAOWeakWrapper *wrapper = [[RNAOWeakWrapper alloc] init];
  wrapper.value = focusDelegate;
  objc_setAssociatedObject(self, &kRNAOScreenReaderFocusDelegate, wrapper, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (void)clearScreenReaderFocusDelegate {
  objc_setAssociatedObject(self, &kRNAOScreenReaderFocusDelegate, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (id<RNAOScreenReaderFocusDelegate>)getScreenReaderFocusDelegate {
  @try {
    RNAOWeakWrapper *wrapper = objc_getAssociatedObject(self, &kRNAOScreenReaderFocusDelegate);
    return wrapper ? wrapper.value : nil;
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
