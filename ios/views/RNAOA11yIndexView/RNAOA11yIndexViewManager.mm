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
    [view updatePosition: @(value)];
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

@end
