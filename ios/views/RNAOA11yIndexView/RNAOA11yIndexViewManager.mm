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
#import "RCTBridge.h"


@implementation RNAOA11yIndexViewManager

RCT_EXPORT_MODULE(A11yIndexView)

- (UIView *)view
{
    return [[RNAOA11yIndexView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(orderIndex, int, RNAOA11yIndexView)
{
    int value = json ? [RCTConvert int:json] : 0;
    [view setPosition: [NSNumber numberWithInteger:value]];
}

RCT_CUSTOM_VIEW_PROPERTY(orderKey, NSString, RNAOA11yIndexView)
{
    NSString *value =  json ? [RCTConvert NSString:json] : @"";
    [view setOrderKey: value];
}

@end
