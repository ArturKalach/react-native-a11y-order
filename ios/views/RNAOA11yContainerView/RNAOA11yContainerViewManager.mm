//
//  RNAOA11yContainerViewManager.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 17/07/2025.
//

#import <Foundation/Foundation.h>
#import "RNAOA11yContainerViewManager.h"

@implementation RNAOA11yContainerViewManager

RCT_EXPORT_MODULE(RNAOA11yContainerView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(containerType, NSInteger, UIView)
{
    NSInteger viewContainerType = json ? [RCTConvert NSInteger:json] : 0;
    view.accessibilityContainerType = (UIAccessibilityContainerType)viewContainerType;
}

@end
