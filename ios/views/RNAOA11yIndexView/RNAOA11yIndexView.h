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

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>


NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yIndexView : RCTViewComponentView

@property NSNumber* position;
@property NSString* orderKey;

NS_ASSUME_NONNULL_END


#else /* RCT_NEW_ARCH_ENABLED */


#import <React/RCTView.h>
@interface RNAOA11yIndexView : RCTView

@property NSNumber* position;
@property NSString* orderKey;

@end


#endif /* RCT_NEW_ARCH_ENABLED */
#endif /* RNAOA11yIndexView_h */
