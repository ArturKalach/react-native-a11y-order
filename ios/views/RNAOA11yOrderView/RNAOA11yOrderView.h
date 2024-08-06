//
//  RNAOA11yOrderView.h
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#ifndef RNAOA11yOrderView_h
#define RNAOA11yOrderView_h


#import <UIKit/UIKit.h>
#import <React/RCTUITextField.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>


NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yOrderView : RCTViewComponentView

@property NSString* orderKey;

@end

NS_ASSUME_NONNULL_END


#else /* RCT_NEW_ARCH_ENABLED */


#import <React/RCTView.h>
@interface RNAOA11yOrderView : RCTView

@property NSString* orderKey;

@end


#endif /* RCT_NEW_ARCH_ENABLED */
#endif /* RNAOA11yOrderView_h */
