#import "RNAOA11yAutoFocusView.h"
#import "RNAOViewItemDelegate.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNAOFabricEventHelper.h"
#endif

@implementation RNAOA11yAutoFocusView {
  BOOL _needsAutoFocus;
  BOOL _descendantFocusChangedEnabled;
  RNAOViewItemDelegate* _viewDelegate;
}

#ifdef RCT_NEW_ARCH_ENABLED

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    _needsAutoFocus = YES;
    _descendantFocusChangedEnabled = NO;
    _viewDelegate = [[RNAOViewItemDelegate alloc] initWithView: self];
  }
  return self;
}

- (void)prepareForRecycle {
  [super prepareForRecycle];
  _needsAutoFocus = YES;
  _autoFocus = NO;
  [_viewDelegate prepareForRecycle];
}

- (void)finalizeUpdates:(RNComponentViewUpdateMask)updateMask {
  [super finalizeUpdates:updateMask];
  [_viewDelegate finalizeUpdates];
}

#else

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    _needsAutoFocus = YES;
    _viewDelegate = [[RNAOViewItemDelegate alloc] initWithView: self];
  }
  return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  [_viewDelegate layoutSubviews];
}

#endif

- (void)setDescendantFocusChangedEnabled:(BOOL)descendantFocusChangedEnabled {
  _descendantFocusChangedEnabled = descendantFocusChangedEnabled;
  if (_descendantFocusChangedEnabled) {
    if (self.superview) {
      [[RNAOA11yFocusService sharedService] subscribe:self];
    }
  } else {
    [[RNAOA11yFocusService sharedService] unsubscribe:self];
  }
}

- (BOOL)descendantFocusChangedEnabled {
  return _descendantFocusChangedEnabled;
}

- (void)focusView {
  dispatch_async(dispatch_get_main_queue(), ^{
    UIAccessibilityPostNotification(UIAccessibilityLayoutChangedNotification, self);
  });
}

- (void)focus {
  [self focusView];
}

- (void)didMoveToWindow {
  [super didMoveToWindow];
  if (self.window) {
    if (_needsAutoFocus && _autoFocus) {
      _needsAutoFocus = NO;
      dispatch_async(dispatch_get_main_queue(), ^{
        [self focusView];
      });
    }
  }
}

- (void)didMoveToSuperview {
  [super didMoveToSuperview];
  if (_descendantFocusChangedEnabled && self.superview) {
    [[RNAOA11yFocusService sharedService] subscribe:self];
  }
}

- (void)removeFromSuperview {
  [[RNAOA11yFocusService sharedService] unsubscribe:self];
  [super removeFromSuperview];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (NSString*)getNativeId:(UIView*)element {
  NSString* nativeId = nil;
  @try {
    nativeId = [element valueForKey:@"_nativeId"];
  } @catch (NSException *exception) {
    nativeId = nil;
  }
  return nativeId;
}
#else
- (NSString*)getNativeId:(UIView*)element {
  return element.nativeID;
}
#endif

- (void)accessibilityElementDidBecomeFocused {
  [super accessibilityElementDidBecomeFocused];
  [self onScreenReaderFocusedHandler];
}

- (void)accessibilityElementDidBecomeFocused:(UIView*)element {
  NSString* nativeId = [self getNativeId: element];
  [self onScreenReaderDescendantFocusChangedHandler: true withId:nativeId];
}

- (void)accessibilityElementDidUnfocused:(UIView*)element {
  NSString* nativeId = [self getNativeId: element];
  [self onScreenReaderDescendantFocusChangedHandler: false withId:nativeId];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)onScreenReaderFocusedHandler {
  [RNAOFabricEventHelper onA11yViewFocused: _eventEmitter];
}
#else
- (void)onScreenReaderFocusedHandler {
  if (self.onScreenReaderFocused) {
    self.onScreenReaderFocused(@{});
  }
}
#endif

#ifdef RCT_NEW_ARCH_ENABLED
- (void)onScreenReaderDescendantFocusChangedHandler:(BOOL)isFocused withId:(NSString*)nativeId {
  NSString* status = isFocused ? @"focused" : @"blurred";
  [RNAOFabricEventHelper onA11yViewScreenReaderDescendantFocusChanged:status withId:nativeId withEmitter:_eventEmitter];
}
#else
- (void)onScreenReaderDescendantFocusChangedHandler:(BOOL)isFocused withId:(NSString*)nativeId {
  if (self.onScreenReaderDescendantFocusChanged) {
    NSString* status = isFocused ? @"focused" : @"blurred";
    self.onScreenReaderDescendantFocusChanged(@{@"status": status, @"nativeId": nativeId});
  }
}
#endif

#ifdef RCT_NEW_ARCH_ENABLED
- (void)onScreenReaderFocusChangeHandler:(BOOL)isFocused {
  [RNAOFabricEventHelper onA11yViewFocusChange:isFocused withEmitter:_eventEmitter];
}
#else
- (void)onScreenReaderFocusChangeHandler:(BOOL)isFocused {
  if (self.onScreenReaderFocusChange) {
    self.onScreenReaderFocusChange(@{@"isFocused" : @(isFocused)});
  }
}
#endif

- (void)onChildAttached:(UIView*)child {
  [_viewDelegate didAddSubview: child];
}

- (void)willRemoveSubview:(UIView *)subview {
  [super willRemoveSubview:subview];
  [_viewDelegate willRemoveSubview: subview];
}

@end
