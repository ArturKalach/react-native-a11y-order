//
//  RNAOA11yOrderView.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RNAOA11yOrderView.h"
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

@interface RNAOA11yOrderView () <RCTA11yIndexViewViewProtocol>

@end

#endif



@implementation RNAOA11yOrderView

- (void)setOrderKey:(NSString *)orderKey {
  _orderKey = orderKey;
}

- (void)setContainer {
  if(_orderKey != nil) {
#ifdef RCT_NEW_ARCH_ENABLED
      [[RNAOA11yOrderLinking sharedInstance] setContainer:_orderKey withView:self];
#else
      [[RNAOA11yOrderLinking sharedInstance] setContainer:_orderKey withView:self withDebounce: YES];
#endif
  }
}

- (void)layoutSubviews {
    [super layoutSubviews];
    [self setContainer];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)prepareForRecycle
{
    [self setAccessibilityElements: nil];
    [super prepareForRecycle];
    [[RNAOA11yOrderLinking sharedInstance] removeContainer:_orderKey];
}
#else
- (void)willMoveToSuperview:(UIView *)newSuperview {
    [super willMoveToSuperview:newSuperview];
    if (newSuperview == nil) {
        [[RNAOA11yOrderLinking sharedInstance] removeContainer:_orderKey];
    }
}
#endif


#ifdef RCT_NEW_ARCH_ENABLED
+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<A11yOrderViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const A11yOrderViewProps>();
        _props = defaultProps;
    }

    return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<A11yOrderViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<A11yOrderViewProps const>(props);
    [super updateProps
     :props oldProps:oldProps];

    if(oldViewProps.orderKey != newViewProps.orderKey) {
          [self setOrderKey:  [NSString stringWithUTF8String:newViewProps.orderKey.c_str()]];
         }
}

Class<RCTComponentViewProtocol> A11yOrderViewCls(void)
{
    return RNAOA11yOrderView.class;
}

#endif

@end
