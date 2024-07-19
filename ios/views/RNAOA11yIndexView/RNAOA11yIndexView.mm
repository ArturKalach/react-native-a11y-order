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
#import <React/RCTLog.h>
#import <React/RCTUITextField.h>
#import "RNAOA11yOrderLinking.h"

#ifdef RCT_NEW_ARCH_ENABLED

#include <string>
#import <react/renderer/components/RNExternalKeyboardViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNExternalKeyboardViewSpec/EventEmitters.h>
#import <react/renderer/components/RNExternalKeyboardViewSpec/Props.h>
#import <react/renderer/components/RNExternalKeyboardViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNAOA11yIndexView () <RCTTextInputFocusWrapperViewProtocol>

@end

#endif



@implementation RNAOA11yIndexView

- (void)didAddSubview:(UIView *)subview {
    [super didAddSubview:subview];
    if(_position != nil && _orderKey != nil) {
        [[RNAOA11yOrderLinking sharedInstance] add: _position withOrderKey:_orderKey withObject:subview];
    }
}


- (void)willRemoveSubview:(UIView *)subview {
    [super willRemoveSubview:subview];
    if(_position != nil && _orderKey != nil) {
        [[RNAOA11yOrderLinking sharedInstance] remove: [NSNumber numberWithInteger:0]  withOrderKey:_orderKey];
    }
}


#ifdef RCT_NEW_ARCH_ENABLED
+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<TextInputFocusWrapperComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const TextInputFocusWrapperProps>();
        _props = defaultProps;
    }
    
    return self;
}


- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<TextInputFocusWrapperProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<TextInputFocusWrapperProps const>(props);
    [super updateProps
     :props oldProps:oldProps];
    
    if(oldViewProps.position != newViewProps.position) {
        [self setPosition: newViewProps.position];
    }
    
    if(oldViewProps.positionKey != newViewProps.positionKey) {
        [self setPositionKey: newViewProps.positionKey];
    }
}

Class<RCTComponentViewProtocol> TextInputFocusWrapperCls(void)
{
    return RNCEKVTextInputFocusWrapper.class;
}

#endif

@end
