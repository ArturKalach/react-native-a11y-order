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

Class<RCTComponentViewProtocol> A11yLockCls(void)
{
  return RNAOA11yLockView.class;
}

#endif

@end
