//
//  RNAOA11yView.h
//  Pods
//
//  Created by Artur Kalach on 17/08/2025.
//

#ifndef RNAOA11yView_h
#define RNAOA11yView_h

#import <UIKit/UIKit.h>
#import "RNAOScreenReaderFocusDelegate.h"
#import "RNAOViewItemProtocol.h"
#import "RNAOA11yFocusService.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>


NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yView : RCTViewComponentView<RNAOScreenReaderFocusDelegate, RNAOViewItemProtocol, RNAOA11yFocusServiceSubscriber>
@property BOOL autoFocus;
@property BOOL descendantFocusChangedEnabled;
@end

NS_ASSUME_NONNULL_END


#else /* RCT_NEW_ARCH_ENABLED */


#import <React/RCTView.h>
@interface RNAOA11yView : RCTView<RNAOScreenReaderFocusDelegate, RNAOViewItemProtocol, RNAOA11yFocusServiceSubscriber>
@property BOOL autoFocus;
@property BOOL descendantFocusChangedEnabled;

@property (nonatomic, copy) RCTDirectEventBlock onScreenReaderDescendantFocusChanged;
@property (nonatomic, copy) RCTDirectEventBlock onScreenReaderFocusChange;
@property (nonatomic, copy) RCTDirectEventBlock onScreenReaderFocused;
@end

#endif

#endif /* RNAOA11yView_h */
