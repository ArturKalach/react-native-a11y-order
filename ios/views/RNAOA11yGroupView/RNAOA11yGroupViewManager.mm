//
//  RNAOA11yGroupViewManager.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#if (!defined(RCT_NEW_ARCH_ENABLED) || RCT_NEW_ARCH_ENABLED == 0) || (defined(RCT_VIEW_MANAGER_ENABLED) && RCT_VIEW_MANAGER_ENABLED == 1)

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

#endif
