//
//  RNAOA11yPaneTitleView.h
//  Pods
//
//  Created by Artur Kalach on 15/08/2025.
//

#ifndef RNAOA11yPaneTitleView_h
#define RNAOA11yPaneTitleView_h

#import <UIKit/UIKit.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>


NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yPaneTitleView : RCTViewComponentView

@property NSString* title;
@property NSString* detachMessage;

@end

NS_ASSUME_NONNULL_END


#else /* RCT_NEW_ARCH_ENABLED */


#import <React/RCTView.h>
@interface RNAOA11yPaneTitleView : RCTView

@property NSString* title;
@property NSString* detachMessage;

@end

#endif

#endif /* RNAOA11yPaneTitleView_h */
