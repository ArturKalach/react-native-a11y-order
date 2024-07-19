//
//  RNAOA11yDirectionViewManager.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RNAOA11yDirectionViewManager.h"
#import "RNAOA11yDirectionView.h"
#import "RCTBridge.h"


@implementation RNAOA11yDirectionViewManager

RCT_EXPORT_MODULE(A11yDirectionView)

- (UIView *)view
{
    return [[RNAOA11yDirectionView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(horizontal, bool, UIView)
{
//    int value =  json ? [RCTConvert int:json] : 0;
//    [view setPosition: value];
}


@end
