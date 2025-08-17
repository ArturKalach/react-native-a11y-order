//
//  RNAOA11yView.m
//  boost-boost_privacy
//
//  Created by Artur Kalach on 17/08/2025.
//

#import <Foundation/Foundation.h>

#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import "RNAOA11yView.h"

#ifdef RCT_NEW_ARCH_ENABLED

#include <string>
#import <react/renderer/components/RNA11yOrderSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNA11yOrderSpec/EventEmitters.h>
#import <react/renderer/components/RNA11yOrderSpec/Props.h>
#import <react/renderer/components/RNA11yOrderSpec/RCTComponentViewHelpers.h>
#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNAOA11yView () <RCTA11yPaneTitleViewProtocol>

@end

#endif



@implementation RNAOA11yView


#ifdef RCT_NEW_ARCH_ENABLED
- (void)prepareForRecycle
{
  [super prepareForRecycle];
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<A11yViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const A11yViewProps>();
    _props = defaultProps;
  }
  
  return self;
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

Class<RCTComponentViewProtocol> A11yViewCls(void)
{
  return RNAOA11yView.class;
}

#endif



@end
