//
//  RNAOA11yLockView.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 29/11/2025.
//

#import <Foundation/Foundation.h>

#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import "RNAOA11yLockView.h"

#ifdef RCT_NEW_ARCH_ENABLED

#include <string>
#import <react/renderer/components/RNA11yOrderSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNA11yOrderSpec/EventEmitters.h>
#import <react/renderer/components/RNA11yOrderSpec/Props.h>
#import <react/renderer/components/RNA11yOrderSpec/RCTComponentViewHelpers.h>
#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNAOA11yLockView () <RCTA11yLockViewProtocol>

@end

#endif



@implementation RNAOA11yLockView

- (void)didMoveToSuperview {
  [super didMoveToSuperview];

  if (self.superview) {
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onAccessibilityFocusChanged:)
                                                 name:UIAccessibilityElementFocusedNotification
                                               object:nil];
  } else {
    [[NSNotificationCenter defaultCenter] removeObserver:self
                                                    name:UIAccessibilityElementFocusedNotification
                                                  object:nil];
  }
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self
                                                  name:UIAccessibilityElementFocusedNotification
                                                object:nil];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)prepareForRecycle {
  [super prepareForRecycle];
  _lockDisabled = NO;
  _componentType = 0;
  [[NSNotificationCenter defaultCenter] removeObserver:self
                                                  name:UIAccessibilityElementFocusedNotification
                                                object:nil];
}
#endif

- (void)onAccessibilityFocusChanged:(NSNotification *)notification {
  if (_lockDisabled) return;

  id element = notification.userInfo[UIAccessibilityFocusedElementKey];
  if (![element isKindOfClass:[UIView class]]) return;

  UIView *focused = (UIView *)element;
  if (![focused isDescendantOfView:self]) {
    UIAccessibilityPostNotification(UIAccessibilityLayoutChangedNotification, self);
  }
}

- (void)setLockDisabled:(BOOL)lockDisabled {
  _lockDisabled = lockDisabled;
  [self requestScreenReaderFocus];
}

- (void)setComponentType:(NSInteger)componentType {
  _componentType = componentType;
}

- (BOOL)shouldUpdateFocusInContext:(UIFocusUpdateContext *)context {
  if (_lockDisabled) {
    return [super shouldUpdateFocusInContext:context];
  }

  UIView *nextFocus = (UIView *)context.nextFocusedView;
  if (nextFocus != nil && ![nextFocus isDescendantOfView:self]) {
    return NO;
  }

  return [super shouldUpdateFocusInContext:context];
}

- (void)requestScreenReaderFocus {
  if (_lockDisabled) return;
  UIAccessibilityPostNotification(UIAccessibilityLayoutChangedNotification, self);
}

- (void)didMoveToWindow {
  [super didMoveToWindow];

  if (self.window) {
    [self requestScreenReaderFocus];
  }
}


#ifdef RCT_NEW_ARCH_ENABLED

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<A11yLockComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const A11yLockProps>();
    _props = defaultProps;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &newViewProps = *std::static_pointer_cast<A11yLockProps const>(props);
  [super updateProps:props oldProps:oldProps];

  self.lockDisabled = newViewProps.lockDisabled;
  self.componentType = newViewProps.componentType;
}

Class<RCTComponentViewProtocol> A11yLockCls(void)
{
  return RNAOA11yLockView.class;
}

#endif

@end
