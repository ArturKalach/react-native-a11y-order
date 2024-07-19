//
//  RNAOA11yDirectionView.h
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#ifndef RNAOA11yDirectionView_h
#define RNAOA11yDirectionView_h



#import <UIKit/UIKit.h>
#import <React/RCTUITextField.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>


NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yDirectionView : RCTViewComponentView

NS_ASSUME_NONNULL_END


#else /* RCT_NEW_ARCH_ENABLED */


#import <React/RCTView.h>
@interface RNAOA11yDirectionView : RCTView

@end

#endif

#endif /* RNAOA11yDirectionView_h */
