//
//  RNAOA11yIndexViewManager.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RNAOA11yIndexView.h"
#import "RNAOA11yIndexViewManager.h"

@implementation RNAOA11yIndexViewManager

RCT_EXPORT_MODULE(A11yIndexView)

- (UIView *)view
{
    return [[RNAOA11yIndexView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(orderIndex, int, RNAOA11yIndexView)
{
    int value = json ? [RCTConvert int:json] : 0;
    [view setPosition: @(value)];
}

RCT_CUSTOM_VIEW_PROPERTY(orderFocusType, int, RNAOA11yIndexView)
{
    int value = json ? [RCTConvert int:json] : 0;
    [view setOrderFocusType: @(value)];
}

RCT_CUSTOM_VIEW_PROPERTY(orderKey, NSString, RNAOA11yIndexView)
{
    NSString *value =  json ? [RCTConvert NSString:json] : @"";
    [view setOrderKey: value];
}

RCT_EXPORT_METHOD(focus:(nonnull NSNumber *)reactTag)
{
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[UIView class]]) {
            return;
        }
        UIAccessibilityPostNotification(UIAccessibilityLayoutChangedNotification, view);
    }];
}

RCT_CUSTOM_VIEW_PROPERTY(autoFocus, BOOL, RNAOA11yIndexView)
{
  BOOL value = json ? [RCTConvert BOOL:json] : NO;
  [view setAutoFocus: value];
}

RCT_CUSTOM_VIEW_PROPERTY(descendantFocusChangedEnabled, BOOL, RNAOA11yIndexView)
{
  BOOL value = json ? [RCTConvert BOOL:json] : NO;
  [view setDescendantFocusChangedEnabled: value];
}

RCT_CUSTOM_VIEW_PROPERTY(containerType, NSInteger, UIView)
{
    NSInteger viewContainerType = json ? [RCTConvert NSInteger:json] : 0;
    view.accessibilityContainerType = (UIAccessibilityContainerType)viewContainerType;
}

RCT_EXPORT_VIEW_PROPERTY(onScreenReaderFocused, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onScreenReaderFocusChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onScreenReaderDescendantFocusChanged, RCTDirectEventBlock)


@end
