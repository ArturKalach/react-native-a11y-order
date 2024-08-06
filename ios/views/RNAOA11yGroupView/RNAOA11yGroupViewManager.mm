//
//  RNAOA11yGroupViewManager.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RNAOA11yGroupViewManager.h"
#import "RNAOA11yGroupView.h"

@implementation RNAOA11yGroupViewManager

RCT_EXPORT_MODULE(A11yGroupView)

- (UIView *)view
{
    return [[RNAOA11yGroupView alloc] init];
}

@end
