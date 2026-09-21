#import "RNAOA11yManagedFocusView.h"
#import "RNAOViewItemDelegate.h"

#import "RNAOFabricEventHelper.h"

@implementation RNAOA11yManagedFocusView {
  BOOL _descendantFocusChangedEnabled;
  RNAOViewItemDelegate* _viewDelegate;
}


- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    _descendantFocusChangedEnabled = NO;
    _viewDelegate = [[RNAOViewItemDelegate alloc] initWithView: self];
  }
  return self;
}

- (void)prepareForRecycle {
  [super prepareForRecycle];
  [_viewDelegate prepareForRecycle];
}

- (void)finalizeUpdates:(RNComponentViewUpdateMask)updateMask {
  [super finalizeUpdates:updateMask];
  [_viewDelegate finalizeUpdates];
}


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

- (NSString*)getNativeId:(UIView*)element {
  NSString* nativeId = nil;
  @try {
    nativeId = [element valueForKey:@"_nativeId"];
  } @catch (NSException *exception) {
    nativeId = nil;
  }
  return nativeId;
}

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

- (void)onScreenReaderFocusedHandler {
  [RNAOFabricEventHelper onA11yViewFocused: _eventEmitter];
}

- (void)onScreenReaderDescendantFocusChangedHandler:(BOOL)isFocused withId:(NSString*)nativeId {
  NSString* status = isFocused ? @"focused" : @"blurred";
  [RNAOFabricEventHelper onA11yViewScreenReaderDescendantFocusChanged:status withId:nativeId withEmitter:_eventEmitter];
}

- (void)onScreenReaderFocusChangeHandler:(BOOL)isFocused {
  [RNAOFabricEventHelper onA11yViewFocusChange:isFocused withEmitter:_eventEmitter];
}

- (void)onChildAttached:(UIView*)child {
  [_viewDelegate didAddSubview: child];
}

- (void)willRemoveSubview:(UIView *)subview {
  [super willRemoveSubview:subview];
  [_viewDelegate willRemoveSubview: subview];
}

@end
