//
//  RNAOA11yUIContainerViewManager.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 17/07/2025.
//

#import <Foundation/Foundation.h>
#import "RNAOA11yUIContainerViewManager.h"
#import "RNAOA11yUIContainerView.h"

@implementation RNAOA11yUIContainerViewManager

RCT_EXPORT_MODULE(A11yUIContainer)

- (UIView *)view
{
  return [[RNAOA11yUIContainerView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(containerType, NSInteger, UIView)
{
    NSInteger viewContainerType = json ? [RCTConvert NSInteger:json] : 0;
    view.accessibilityContainerType = (UIAccessibilityContainerType)viewContainerType;
}

@end
