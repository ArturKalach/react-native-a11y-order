//
//  RNAOA11yIndexView.h
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#ifndef RNAOA11yIndexView_h
#define RNAOA11yIndexView_h

#import <UIKit/UIKit.h>
#import <React/RCTUITextField.h>
#import "RNAOScreenReaderFocusDelegate.h"
#import "RNAOViewItemProtocol.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>


NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yIndexView : RCTViewComponentView<RNAOScreenReaderFocusDelegate, RNAOViewItemProtocol>

- (void)setPosition: (NSNumber*)position;
- (void)setOrderKey:(NSString *)orderKey;
- (void)setOrderFocusType:(NSNumber *)orderFocusType;

@end

NS_ASSUME_NONNULL_END


#else /* RCT_NEW_ARCH_ENABLED */


#import <React/RCTView.h>
@interface RNAOA11yIndexView : RCTView<RNAOScreenReaderFocusDelegate, RNAOViewItemProtocol>

- (void)setPosition: (NSNumber*)position;
- (void)setOrderKey:(NSString *)orderKey;
- (void)setOrderFocusType:(NSNumber *)orderFocusType;
@property (nonatomic, copy) RCTDirectEventBlock onScreenReaderFocusChange;
@end


#endif /* RCT_NEW_ARCH_ENABLED */
#endif /* RNAOA11yIndexView_h */
