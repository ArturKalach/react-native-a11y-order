//
//  RNAOA11yLockView.h
//  Pods
//
//  Created by Artur Kalach on 29/11/2025.
//

#ifndef RNAOA11yLockView_h
#define RNAOA11yLockView_h

#import <UIKit/UIKit.h>
#import "RNAOScreenReaderFocusDelegate.h"
#import "RNAOViewItemProtocol.h"


#import <React/RCTViewComponentView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yLockView : RCTViewComponentView
@property (nonatomic, assign) BOOL lockDisabled;
@property (nonatomic, assign) NSInteger componentType;
@end

NS_ASSUME_NONNULL_END


#endif /* RNAOA11yLockView_h */
