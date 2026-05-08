#import "RNAOA11yIndexView.h"

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

@implementation RNAOA11yIndexView

#ifdef RCT_NEW_ARCH_ENABLED

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const A11yIndexViewProps>();
    _props = defaultProps;
  }
  return self;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<A11yIndexViewComponentDescriptor>();
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
  const auto &oldViewProps = *std::static_pointer_cast<A11yIndexViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<A11yIndexViewProps const>(props);
  [super updateProps:props oldProps:oldProps];

  if (oldViewProps.orderIndex != newViewProps.orderIndex || [self delegatePosition] == nil) {
    [self setPosition: @(newViewProps.orderIndex)];
  }

  if (oldViewProps.orderKey != newViewProps.orderKey || [self delegateOrderKey] == nil) {
    [self setOrderKey: [NSString stringWithUTF8String:newViewProps.orderKey.c_str()]];
  }

  if (oldViewProps.orderFocusType != newViewProps.orderFocusType || [self delegateOrderFocusType] == nil) {
    [self setOrderFocusType: @(newViewProps.orderFocusType)];
  }

  if (self.autoFocus != newViewProps.autoFocus) {
    [self setAutoFocus: newViewProps.autoFocus];
  }

  if (self.groupChildrenMode != newViewProps.shouldGroupAccessibilityChildren) {
    self.groupChildrenMode = newViewProps.shouldGroupAccessibilityChildren;
  }
  
  if (self.descendantFocusChangedEnabled != newViewProps.descendantFocusChangedEnabled) {
    [self setDescendantFocusChangedEnabled: newViewProps.descendantFocusChangedEnabled];
  }
  
  if (oldViewProps.containerType != newViewProps.containerType) {
      NSInteger containerType = newViewProps.containerType;
      self.accessibilityContainerType = (UIAccessibilityContainerType)containerType;
  }
}

Class<RCTComponentViewProtocol> A11yIndexViewCls(void) {
  return RNAOA11yIndexView.class;
}

#endif

@end
