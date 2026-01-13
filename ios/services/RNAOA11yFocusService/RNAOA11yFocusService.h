//
//  RNAOA11yFocusService.h
//  Pods
//
//  Created by Artur Kalach on 04/12/2025.
//

#ifndef RNAOA11yFocusService_h
#define RNAOA11yFocusService_h

@protocol RNAOA11yFocusServiceSubscriber <NSObject>
- (void)accessibilityElementDidBecomeFocused:(UIView*)view;
- (void)accessibilityElementDidUnfocused:(UIView*)view;
@end

@interface RNAOA11yFocusService : NSObject

+ (instancetype)sharedService;
- (void)subscribe:(UIView<RNAOA11yFocusServiceSubscriber> *)subscriber;
- (void)unsubscribe:(UIView<RNAOA11yFocusServiceSubscriber> *)subscriber;
@end

#endif /* RNAOA11yFocusService_h */
