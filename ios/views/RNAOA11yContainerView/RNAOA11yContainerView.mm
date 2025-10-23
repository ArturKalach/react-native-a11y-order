//
//  RNAOA11yContainerView.m
//  RNAOA11yContainerView
//
//  Created by Artur Kalach on 17/07/2025.
//


#import <Foundation/Foundation.h>

#import "RNAOA11yContainerView.h"
#import <UIKit/UIKit.h>

#ifdef RCT_NEW_ARCH_ENABLED

#include <string>
#import <react/renderer/components/RNA11yOrderSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNA11yOrderSpec/EventEmitters.h>
#import <react/renderer/components/RNA11yOrderSpec/Props.h>
#import <react/renderer/components/RNA11yOrderSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNAOA11yContainerView () <RCTA11yContainerViewViewProtocol>

@end

#endif



@implementation RNAOA11yContainerView


#ifdef RCT_NEW_ARCH_ENABLED
+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<A11yContainerViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const A11yContainerViewProps>();
        _props = defaultProps;
    }

    return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<A11yContainerViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<A11yContainerViewProps const>(props);


    if (oldViewProps.containerType != newViewProps.containerType) {
        NSInteger containerType = newViewProps.containerType;
        self.accessibilityContainerType = (UIAccessibilityContainerType)containerType;
    }

    [super updateProps:props oldProps:oldProps];
}


Class<RCTComponentViewProtocol> A11yContainerViewCls(void)
{
    return RNAOA11yContainerView.class;
}
#else
- (BOOL)shouldGroupAccessibilityChildren
{
  return YES;
}
#endif

@end
