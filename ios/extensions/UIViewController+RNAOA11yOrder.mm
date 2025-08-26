//
//  UIViewController+RNAOA11yOrder.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 13/08/2025.
//

#import <Foundation/Foundation.h>


#import <Foundation/Foundation.h>

#import "UIViewController+RNAOA11yOrder.h"
#import "RNAOSwizzleInstanceMethod.h"
#import <objc/runtime.h>


static char kRnaoFocusViewRefKey;
static char kRnaoFocusRestoreKey;

@implementation UIViewController (RNAOA11yOrder)

- (void)setRnaoFocusViewRef:(UIView *)focusRef {
    objc_setAssociatedObject(self, &kRnaoFocusViewRefKey, focusRef, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (UIView *)rnaoFocusViewRef {
    return objc_getAssociatedObject(self, &kRnaoFocusViewRefKey);
}

- (void)setRnaoFocusRestore:(bool)focusRestore {
    objc_setAssociatedObject(self, &kRnaoFocusRestoreKey, @(focusRestore), OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (bool)isRnaoFocusRestore {
    return [objc_getAssociatedObject(self, &kRnaoFocusRestoreKey) boolValue];
}

+ (void)load
{
    static dispatch_once_t once_token;

    dispatch_once(&once_token, ^{
      RNAOSwizzleInstanceMethod([self class], @selector(viewDidAppear:), @selector(rnaoViewDidAppear:));
      RNAOSwizzleInstanceMethod([self class], @selector(viewWillDisappear:), @selector(rnaoViewWillDisappear:));
    });
}


- (void)saveAccessibilityFocusedView
{
  if(![self isRnaoFocusRestore]) return;
  id focusedElement = UIAccessibilityFocusedElement(nil);
  if (focusedElement && [focusedElement isKindOfClass:[UIView class]]) {
    [self setRnaoFocusViewRef: focusedElement];
  }
}

- (void)restoreAccessibilityFocusedView
{
  if(![self isRnaoFocusRestore]) return;
  id viewToFocus = [self rnaoFocusViewRef];
  if (viewToFocus) {
    dispatch_async(dispatch_get_main_queue(), ^{
      dispatch_async(dispatch_get_main_queue(), ^{
        UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, viewToFocus);
        [self setRnaoFocusViewRef: nil];
      });
    });
  }
}

- (void)rnaoViewDidAppear:(BOOL)animated {
    [self rnaoViewDidAppear:animated];
    [self restoreAccessibilityFocusedView];
}

- (void)rnaoViewWillDisappear:(BOOL)animated {
  [self rnaoViewWillDisappear: animated];
  [self saveAccessibilityFocusedView];
}

@end
