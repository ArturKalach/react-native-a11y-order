//
//  RNAOA11yPaneTitleView.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 15/08/2025.
//

#import <Foundation/Foundation.h>

#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import "RNAOA11yPaneTitleView.h"
#import "UIViewController+RNAOA11yOrder.h"

#ifdef RCT_NEW_ARCH_ENABLED

#include <string>
#import <react/renderer/components/RNA11yOrderSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNA11yOrderSpec/EventEmitters.h>
#import <react/renderer/components/RNA11yOrderSpec/Props.h>
#import <react/renderer/components/RNA11yOrderSpec/RCTComponentViewHelpers.h>
#import "RNAOPropsHelper.h"
#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNAOA11yPaneTitleView () <RCTA11yPaneTitleViewProtocol>

@end

#endif



@implementation RNAOA11yPaneTitleView


#ifdef RCT_NEW_ARCH_ENABLED
- (void)prepareForRecycle
{
  [super prepareForRecycle];
  _title = nil;
  _detachMessage = nil;
  _withFocusRestore = NO;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<A11yPaneTitleComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RNAOA11yContainerViewProps>();
    _props = defaultProps;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<A11yPaneTitleProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<A11yPaneTitleProps const>(props);
  [super updateProps
   :props oldProps:oldProps];

  if ([RNAOPropsHelper isPropChanged: _title stringValue: newViewProps.title]) {
    [self setTitle: [RNAOPropsHelper unwrapStringValue: newViewProps.title]];
  }

  if ([RNAOPropsHelper isPropChanged: _detachMessage stringValue: newViewProps.detachMessage]) {
    [self setDetachMessage: [RNAOPropsHelper unwrapStringValue: newViewProps.detachMessage]];
  }

  if (_withFocusRestore != newViewProps.withFocusRestore) {
    [self setWithFocusRestore: newViewProps.withFocusRestore];
  }
}

Class<RCTComponentViewProtocol> A11yPaneTitleCls(void)
{
  return RNAOA11yPaneTitleView.class;
}

#endif

- (void)didMoveToWindow {
  [super didMoveToWindow];

  NSString *message = self.window ? _title : _detachMessage;
  if(message) {
    UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, message);
  }

  if (self.window) {
    if(self.withFocusRestore) {
      UIViewController* viewController = self.reactViewController;
      [viewController setRnaoFocusRestore: true];
    }
  }
}

@end
