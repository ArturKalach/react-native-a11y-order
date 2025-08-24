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
#import "RNAOPropsHelper.h"

using namespace facebook::react;

@interface RNAOA11yView () <RCTA11yPaneTitleViewProtocol>

@end

#endif



@implementation RNAOA11yView {
  BOOL _needsAutoFocus;
}


#ifdef RCT_NEW_ARCH_ENABLED
- (void)prepareForRecycle
{
  [super prepareForRecycle];
  _needsAutoFocus = YES;
  _autoFocus = NO;
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
    _needsAutoFocus = YES;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<A11yViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<A11yViewProps const>(props);
  [super updateProps
   :props oldProps:oldProps];

  if (_autoFocus != newViewProps.autoFocus) {
    [self setAutoFocus: newViewProps.autoFocus];
  }

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

#else

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    _needsAutoFocus = YES;
  }

  return self;
}

#endif

- (void)focusView {
  dispatch_async(dispatch_get_main_queue(), ^{
    UIAccessibilityPostNotification(UIAccessibilityLayoutChangedNotification, self);
  });
   
}

- (void)didMoveToWindow {
  [super didMoveToWindow];

  if (self.window) {
    if(_needsAutoFocus && _autoFocus) {
      _needsAutoFocus = NO;
      dispatch_async(dispatch_get_main_queue(), ^{
        [self focusView];
      });
    }
  } 
}

@end
