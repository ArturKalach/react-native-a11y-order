#import "RNAOA11yViewOrder.h"
#import "RNAOA11yItemDelegate.h"

#import "RNAOFabricEventHelper.h"

@implementation RNAOA11yViewOrder {
  RNAOA11yItemDelegate* _a11yItemDelegate;
}


- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    _a11yItemDelegate = [[RNAOA11yItemDelegate alloc] initWithView: self];
  }
  return self;
}

- (void)finalizeUpdates:(RNComponentViewUpdateMask)updateMask {
  [super finalizeUpdates:updateMask];
  [_a11yItemDelegate finalizeUpdates];
}

- (void)prepareForRecycle {
  [_a11yItemDelegate clear];
  [super prepareForRecycle];
}


- (void)setPosition:(NSNumber*)position {
  [_a11yItemDelegate setPosition: position];
}

- (void)setOrderKey:(NSString *)orderKey {
  [_a11yItemDelegate setOrderKey: orderKey];
}

- (void)setOrderFocusType:(NSNumber *)orderFocusType {
  [_a11yItemDelegate setOrderFocusType: orderFocusType];
}

- (nullable NSNumber*)delegatePosition {
  return _a11yItemDelegate.position;
}

- (nullable NSString*)delegateOrderKey {
  return _a11yItemDelegate.orderKey;
}

- (nullable NSNumber*)delegateOrderFocusType {
  return _a11yItemDelegate.orderFocusType;
}

- (void)onChildAttached:(UIView*)child {
  [_a11yItemDelegate didAddSubview: child];
}

- (void)willRemoveSubview:(UIView *)subview {
  [super willRemoveSubview:subview];
  [_a11yItemDelegate willRemoveSubview: subview];
}

- (void)onScreenReaderFocusChangeHandler:(BOOL)isFocused {
  [RNAOFabricEventHelper onIndexViewFocusChange:isFocused withEmitter:_eventEmitter];
}

@end
