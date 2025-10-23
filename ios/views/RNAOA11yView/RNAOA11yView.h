//
//  RNAOA11yView.h
//  Pods
//
//  Created by Artur Kalach on 17/08/2025.
//

#ifndef RNAOA11yView_h
#define RNAOA11yView_h


#import <UIKit/UIKit.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>


NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yView : RCTViewComponentView
@property BOOL autoFocus;
@end

NS_ASSUME_NONNULL_END


#else /* RCT_NEW_ARCH_ENABLED */


#import <React/RCTView.h>
@interface RNAOA11yView : RCTView
@property BOOL autoFocus;
@end

#endif

#endif /* RNAOA11yView_h */
