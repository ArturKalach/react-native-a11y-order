//
//  RNAOA11yIndexView.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RNAOA11yIndexView.h"
#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import "RNAOA11yOrderLinking.h"
#import "RNAOA11yItemDelegate.h"

#ifdef RCT_NEW_ARCH_ENABLED

#include <string>
#import <react/renderer/components/RNA11yOrderSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNA11yOrderSpec/EventEmitters.h>
#import <react/renderer/components/RNA11yOrderSpec/Props.h>
#import <react/renderer/components/RNA11yOrderSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNAOA11yIndexView () <RCTA11yIndexViewViewProtocol>

@end

#endif

@implementation RNAOA11yIndexView {
  BOOL isLinked;
  RNAOA11yItemDelegate* _a11yItemDelegate;
}

- (void)didAddSubview:(UIView *)subview {
  [super didAddSubview:subview];
  [_a11yItemDelegate didAddSubview:subview];
}

#ifndef RCT_NEW_ARCH_ENABLED
- (void)layoutSubviews {
  [super layoutSubviews];
  [_a11yItemDelegate finalizeUpdates];
}
#endif

- (void)willRemoveSubview:(UIView *)subview {
  [super willRemoveSubview:subview];
  [_a11yItemDelegate willRemoveSubview: subview];
}

- (void)setPosition: (NSNumber*)position {
  [_a11yItemDelegate setPosition: position];
}

- (void)setOrderKey:(NSString *)orderKey {
  [_a11yItemDelegate setOrderKey:orderKey];
  
}
- (void)setOrderFocusType:(NSNumber *)orderFocusType {
  [_a11yItemDelegate setOrderFocusType: orderFocusType];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const A11yIndexViewProps>();
    _props = defaultProps;
    isLinked = NO;
    _a11yItemDelegate = [[RNAOA11yItemDelegate alloc] initWithView: self];
  }
  
  return self;
}
#else
- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    isLinked = NO;
    _a11yItemDelegate = [[RNAOA11yItemDelegate alloc] initWithView: self];
  }
  
  return self;
}
#endif

#ifdef RCT_NEW_ARCH_ENABLED
+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<A11yIndexViewComponentDescriptor>();
}


- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<A11yIndexViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<A11yIndexViewProps const>(props);
  [super updateProps
   :props oldProps:oldProps];
  
  BOOL isIndexChanged = oldViewProps.orderIndex != newViewProps.orderIndex || _a11yItemDelegate.position == nil;
  if(isIndexChanged) {
    [self setPosition: @(newViewProps.orderIndex)];
  }
  
  BOOL isOrderChanged = oldViewProps.orderKey != newViewProps.orderKey || _a11yItemDelegate.orderKey == nil;
  if(isOrderChanged) {
    [self setOrderKey: [NSString stringWithUTF8String:newViewProps.orderKey.c_str()]];
  }
  
  BOOL isOrderFocusTypeChanged = oldViewProps.orderFocusType != newViewProps.orderFocusType || _a11yItemDelegate.orderFocusType == nil;
  if(isOrderFocusTypeChanged) {
    [self setOrderFocusType: @(newViewProps.orderFocusType)];
  }
}

- (void)finalizeUpdates:(RNComponentViewUpdateMask)updateMask {
  [super finalizeUpdates:updateMask];
  [_a11yItemDelegate finalizeUpdates];
}

- (void)focusView {
  UIAccessibilityPostNotification(UIAccessibilityLayoutChangedNotification, self);
}

- (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args {
  NSString *FOCUS = @"focus";
  if([commandName isEqual:FOCUS]) {
    [self focusView];
  }
}

- (void)prepareForRecycle
{
  isLinked = NO;
  [_a11yItemDelegate clear];
  [super prepareForRecycle];
}

Class<RCTComponentViewProtocol> A11yIndexViewCls(void)
{
  return RNAOA11yIndexView.class;
}

#endif

@end
