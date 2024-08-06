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
}

- (void)linkIndex:(UIView *)subview {
    if(_position != nil && _orderKey != nil && !isLinked) {
        [[RNAOA11yOrderLinking sharedInstance] add: _position withOrderKey:_orderKey withObject:subview];
        isLinked = YES;
    }
}

- (void)didAddSubview:(UIView *)subview {
    [super didAddSubview:subview];
    [self linkIndex:subview];
}


- (void)willRemoveSubview:(UIView *)subview {
    [super willRemoveSubview:subview];
    if(_position != nil && _orderKey != nil) {
        [[RNAOA11yOrderLinking sharedInstance] remove:_position withOrderKey:_orderKey];
    }
}

- (void)updatePosition:(NSNumber *)position {
    if(_position != nil || _position != position) {
        if(_orderKey != nil && self.subviews.count > 0 && isLinked) {
            [[RNAOA11yOrderLinking sharedInstance] update:position lastPosition:_position withOrderKey: _orderKey withView: self.subviews[0]];
        }
        _position = position;
    }
    
    if(_position == nil && _position != position) {
        _position = position;
    }
}

#ifdef RCT_NEW_ARCH_ENABLED
- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const A11yIndexViewProps>();
        _props = defaultProps;
        isLinked = NO;
    }
    
    return self;
}
#else
- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        isLinked = NO;
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
    
    BOOL isIndexChanged = oldViewProps.orderIndex != newViewProps.orderIndex || _position == nil;
    if(isIndexChanged) {
        [self updatePosition: @(newViewProps.orderIndex)];
    }
    
    BOOL isOrderChanged = oldViewProps.orderKey != newViewProps.orderKey || _orderKey == nil;
    if(isOrderChanged) {
        [self setOrderKey: [NSString stringWithUTF8String:newViewProps.orderKey.c_str()]];
    }
}

- (void)finalizeUpdates:(RNComponentViewUpdateMask)updateMask {
    if(self.subviews.count > 0) {
        [self linkIndex: self.subviews[0]];
    }
    [super finalizeUpdates:updateMask];
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
    _position = nil;
    _orderKey = nil;
    [super prepareForRecycle];
}

Class<RCTComponentViewProtocol> A11yIndexViewCls(void)
{
    return RNAOA11yIndexView.class;
}

#endif

@end
