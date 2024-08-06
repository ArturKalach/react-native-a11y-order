//
//  RNAOA11yOrderViewManager.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>


#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RNAOA11yOrderView.h"
#import "RNAOA11yOrderViewManager.h"

@implementation RNAOA11yOrderViewManager

RCT_EXPORT_MODULE(A11yOrderView)

- (UIView *)view
{
    return [[RNAOA11yOrderView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(orderKey, NSString, RNAOA11yOrderView)
{
    NSString *value = json ? [RCTConvert NSString:json] : @"";
    [view setOrderKey:value];
}

@end
