//
//  RNAOA11yPaneTitleViewManager.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 15/08/2025.
//

#import <Foundation/Foundation.h>

#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RNAOA11yPaneTitleView.h"
#import "RNAOA11yPaneTitleViewManager.h"

@implementation RNAOA11yPaneTitleViewManager

RCT_EXPORT_MODULE(A11yPaneTitle)

- (UIView *)view
{
  return [[RNAOA11yPaneTitleView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(title, NSString, RNAOA11yPaneTitleView)
{
  NSString *value = json ? [RCTConvert NSString:json] : nil;
  [view setTitle:value];
}

RCT_CUSTOM_VIEW_PROPERTY(detachMessage, NSString, RNAOA11yPaneTitleView)
{
  NSString *value = json ? [RCTConvert NSString:json] : nil;
  [view setDetachMessage: value];
}

@end
