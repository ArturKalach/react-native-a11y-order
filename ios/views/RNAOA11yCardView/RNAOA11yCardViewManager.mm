//
//  RNAOA11yCardViewManager.mm
//  react-native-a11y-order
//

#import "RNAOA11yCardView.h"
#import "RNAOA11yCardViewManager.h"

@implementation RNAOA11yCardViewManager

RCT_EXPORT_MODULE(A11yCardView)

- (UIView *)view {
  return [[RNAOA11yCardView alloc] init];
}

@end
