//
//  RNAOViewItemDelegate.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 21/10/2025.
//

#import <Foundation/Foundation.h>

#import "RNAOViewItemDelegate.h"

@implementation RNAOViewItemDelegate {
  __weak UIView<RNAOViewItemProtocol> *_delegate;
  BOOL _isLinked;
}

- (instancetype _Nonnull)initWithView:
(UIView<RNAOViewItemProtocol> *_Nonnull)delegate {
  self = [super init];
  if (self) {
    _delegate = delegate;
    _isLinked = false;
  }
  return self;
}

- (void)prepareForRecycle {
  [self clear];
}

- (void)finalizeUpdates {
  if(!_delegate) return;
  [self linkTarget];
}


- (void)linkTarget {
  if(_isLinked) return;
  UIView* focusTarget = [self getFocusView];
  [self setLinkView: focusTarget];
}

- (void)setLinkView:(UIView*)view {
  _linkView = view;
  _isLinked = true;
  [_delegate onFocusItemLinked: view];
}


- (void)didAddSubview:(UIView *)subview {
  [self linkTarget];
}

- (void)willRemoveSubview:(UIView *)subview {
  if(_linkView == subview) {
    [self clear];
  }
}

- (void)clear {
  if(!_delegate) return;
  [_delegate onFocusItemLinked: _linkView];
  _isLinked = false;
  _linkView = nil;
}

- (void)layoutSubviews {
  [self linkTarget];
}

- (UIView *)getFocusView {
  if(!_delegate) return nil;
  return [self findFirstAccessibleChild: _delegate];
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
