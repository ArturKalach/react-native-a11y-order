//
//  RNAOA11yUIContainerView.h
//  A11yOrder
//
//  Created by Artur Kalach on 17/07/2025.
//

#ifndef RNAOA11yUIContainerView_h
#define RNAOA11yUIContainerView_h

#import <UIKit/UIKit.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>


NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yUIContainerView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END


#else /* RCT_NEW_ARCH_ENABLED */


#import <React/RCTView.h>
@interface RNAOA11yUIContainerView : RCTView

@end


#endif /* RCT_NEW_ARCH_ENABLED */
#endif /* RNAOA11yUIContainerView_h */
