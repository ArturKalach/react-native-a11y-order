//
//  RNAOA11yCardView.mm
//  react-native-a11y-order
//

#import "RNAOA11yCardView.h"

#ifdef RCT_NEW_ARCH_ENABLED

#import <react/renderer/components/RNA11yOrderSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNA11yOrderSpec/RCTComponentViewHelpers.h>
#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

#endif

@implementation RNAOA11yCardView

- (nullable NSArray *)accessibilityElements {
  return self.subviews;
}

#ifdef RCT_NEW_ARCH_ENABLED

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<A11yCardViewComponentDescriptor>();
}

Class<RCTComponentViewProtocol> A11yCardViewCls(void) {
  return RNAOA11yCardView.class;
}

#endif

@end
