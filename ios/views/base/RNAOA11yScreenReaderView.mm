#import "RNAOA11yScreenReaderView.h"
#import "UIView+RNAOA11yOrder.h"

@implementation RNAOA11yScreenReaderView

- (void)onScreenReaderFocusChangeHandler:(BOOL)isFocused {}

- (void)onFocusItemLinked:(UIView *)view {
  [view setScreenReaderFocusDelegate: self];
}

- (void)onFocusItemRemoved:(UIView *)view {
  [view clearScreenReaderFocusDelegate];
}

- (void)onScreenReaderFocusChanged:(BOOL)focused {
  [self onScreenReaderFocusChangeHandler: focused];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)focusView {
  UIAccessibilityPostNotification(UIAccessibilityLayoutChangedNotification, self);
}

- (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args {
  if ([commandName isEqual:@"focus"]) {
    [self focusView];
  }
}
#endif

@end
