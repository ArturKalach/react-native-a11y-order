//
//  UIView+RNAOA11yOrder.h
//  Pods
//
//  Created by Artur Kalach on 21/10/2025.
//

#ifndef UIView_RNAOA11yOrder_h
#define UIView_RNAOA11yOrder_h

#import <UIKit/UIKit.h>
#import "RNAOScreenReaderFocusDelegate.h"

@interface UIView (RNAOA11yOrder)
- (void)setScreenReaderFocusDelegate:(id<RNAOScreenReaderFocusDelegate>)focusDelegate;
- (void)clearScreenReaderFocusDelegate;
@end

#endif /* UIView_RNAOA11yOrder_h */
