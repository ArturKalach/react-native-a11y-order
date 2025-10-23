//
//  RNAOA11yItemDelegate.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 01/10/2025.
//

#import <Foundation/Foundation.h>
#import "RNAOA11yItemDelegate.h"
#import "RNAOA11yOrderLinking.h"
#import "RNAOA11yItemProtocol.h"

typedef NS_ENUM(NSInteger, A11yOrderType) {
    A11yOrderTypeDefault = 0,
    A11yOrderTypeChild = 1,
    A11yOrderTypeLegacy = 2,
};


@implementation RNAOA11yItemDelegate {
  __weak UIView *_delegate;
  BOOL _isLinked;
}

- (instancetype _Nonnull)initWithView:
(UIView<RNAOA11yItemProtocol> *_Nonnull)delegate {
  self = [super init];
  if (self) {
    _delegate = delegate;
    _isLinked = false;
  }
  return self;
}

- (void)setPosition:(NSNumber *)position {
  NSNumber *_lastPostion = _position;
  _position = position;
  
  if(_lastPostion != nil && _lastPostion != position) {
    [self relink: position lastPosition: _lastPostion];
  }
}

- (void)setOrderFocusType:(NSNumber *)orderFocusType {
  if(_orderFocusType != nil && _orderFocusType != orderFocusType) {
    _orderFocusType = orderFocusType;
    [self relink: _position lastPosition: _position];
  } else {
    _orderFocusType = orderFocusType;
  }
}

- (void)finalizeUpdates {
  if(!_delegate) return;
  if(_delegate.subviews.count > 0) {
      [self setLinkView: _delegate.subviews[0]];
  }
}

- (void)setLinkView: (UIView*) view {
  if(_isLinked) return;
  _linkView = view;
  
  [self link];
}


- (void)didAddSubview:(UIView *)subview {
  if(!_linkView) {
    _isLinked = false;
    UIView* view = [self getFocusView: subview];
    _linkView = view;
  }
}

- (void)willRemoveSubview:(UIView *)subview {
  if(_linkView == subview) {
    [self clear];
  }
}

- (void)relink:(NSNumber *)position lastPosition:(NSNumber*)lastPosition {
  if(!_delegate) return;
  
  if(_orderKey != nil && position != nil && _isLinked) {
    UIView* view = _linkView ? _linkView : [self getFocusView: _delegate.subviews[0]];
    [[RNAOA11yOrderLinking sharedInstance] update: position lastPosition:lastPosition withOrderKey: _orderKey withView: view];
  }
}

- (void)link {
  if(!_delegate) return;
  
  if(self.position && self.orderKey && self.linkView && !_isLinked) {
    [[RNAOA11yOrderLinking sharedInstance] add: _position withOrderKey:_orderKey withObject:self.linkView];
    
    _isLinked = true;
  }
}

- (void)clear {
  if(!_delegate) return;
  _isLinked = false;
  if(_position != nil && _orderKey != nil) {
      [[RNAOA11yOrderLinking sharedInstance] remove:_position withOrderKey:_orderKey];
  }
}

- (UIView *)getFocusView:(UIView *)subview {
  if(!_delegate) return nil;
    switch ([_orderFocusType intValue]) {
        case A11yOrderTypeDefault:
            return _delegate;
        case A11yOrderTypeLegacy:
            return subview;
        case A11yOrderTypeChild:
            return [self findFirstAccessibleChild: _delegate];
        default:
            return _delegate;
    }
}

- (UIView *)findFirstAccessibleChild:(UIView *)parentView {
    if (!parentView) {
        return nil;
    }
    
    for (UIView *child in parentView.subviews) {
        if ([self isAccessibleView:child]) {
            return child;
        }
        
        UIView *accessibleChild = [self findFirstAccessibleChild:child];
        if (accessibleChild != nil) {
            return accessibleChild;
        }
    }
    
    return nil;
}

- (BOOL)isAccessibleView:(UIView *)view {
    return view.isAccessibilityElement && view.hidden == NO && view.alpha > 0;
}
@end
