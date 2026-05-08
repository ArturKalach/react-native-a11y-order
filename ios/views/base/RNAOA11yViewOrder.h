#ifndef RNAOA11yViewOrder_h
#define RNAOA11yViewOrder_h

#import "RNAOA11yAutoFocusView.h"

#ifdef RCT_NEW_ARCH_ENABLED

NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yViewOrder : RNAOA11yAutoFocusView

- (void)setPosition:(NSNumber*)position;
- (void)setOrderKey:(NSString *)orderKey;
- (void)setOrderFocusType:(NSNumber *)orderFocusType;

- (nullable NSNumber*)delegatePosition;
- (nullable NSString*)delegateOrderKey;
- (nullable NSNumber*)delegateOrderFocusType;

@end

NS_ASSUME_NONNULL_END

#else

@interface RNAOA11yViewOrder : RNAOA11yAutoFocusView

- (void)setPosition:(NSNumber*)position;
- (void)setOrderKey:(NSString *)orderKey;
- (void)setOrderFocusType:(NSNumber *)orderFocusType;

- (nullable NSNumber*)delegatePosition;
- (nullable NSString*)delegateOrderKey;
- (nullable NSNumber*)delegateOrderFocusType;

@end

#endif

#endif /* RNAOA11yViewOrder_h */
