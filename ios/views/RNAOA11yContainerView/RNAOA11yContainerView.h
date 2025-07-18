//
//  RNAOA11yContainerView.h
//  A11yOrder
//
//  Created by Artur Kalach on 17/07/2025.
//

#ifndef RNAOA11yContainerView_h
#define RNAOA11yContainerView_h

#import <UIKit/UIKit.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>


NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yContainerView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END


#else /* RCT_NEW_ARCH_ENABLED */


#import <React/RCTView.h>
@interface RNAOA11yContainerView : RCTView

@end


#endif /* RCT_NEW_ARCH_ENABLED */
#endif /* RNAOA11yContainerView_h */
