//
//  RNAOA11yGroupView.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//


#import <Foundation/Foundation.h>

#import "RNAOA11yGroupView.h"
#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>

#ifdef RCT_NEW_ARCH_ENABLED

#include <string>
#import <react/renderer/components/RNA11yOrderSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNA11yOrderSpec/EventEmitters.h>
#import <react/renderer/components/RNA11yOrderSpec/Props.h>
#import <react/renderer/components/RNA11yOrderSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNAOA11yGroupView () <RCTA11yGroupViewViewProtocol>

@end

#endif



@implementation RNAOA11yGroupView

- (BOOL)shouldGroupAccessibilityChildren
{
  return YES;
}

#ifdef RCT_NEW_ARCH_ENABLED
+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<A11yGroupViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const A11yGroupViewProps>();
        _props = defaultProps;
    }

    return self;
}


Class<RCTComponentViewProtocol> A11yGroupViewCls(void)
{
    return RNAOA11yGroupView.class;
}

#endif

@end
