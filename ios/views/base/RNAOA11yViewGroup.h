#ifndef RNAOA11yViewGroup_h
#define RNAOA11yViewGroup_h

#import <UIKit/UIKit.h>

#import <React/RCTViewComponentView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yViewGroup : RCTViewComponentView

- (nullable UIView*)getSubChild;
- (void)onChildAttached:(UIView*)child;
- (void)onChildRemoved;

@end

NS_ASSUME_NONNULL_END


#endif /* RNAOA11yViewGroup_h */
