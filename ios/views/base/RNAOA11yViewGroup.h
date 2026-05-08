#ifndef RNAOA11yViewGroup_h
#define RNAOA11yViewGroup_h

#import <UIKit/UIKit.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yViewGroup : RCTViewComponentView

- (nullable UIView*)getSubChild;
- (void)onChildAttached:(UIView*)child;
- (void)onChildRemoved;

@end

NS_ASSUME_NONNULL_END

#else

#import <React/RCTView.h>

@interface RNAOA11yViewGroup : RCTView

- (nullable UIView*)getSubChild;
- (void)onChildAttached:(UIView*)child;
- (void)onChildRemoved;

@end

#endif

#endif /* RNAOA11yViewGroup_h */
