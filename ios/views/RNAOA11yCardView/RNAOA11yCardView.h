//
//  RNAOA11yCardView.h
//  react-native-a11y-order
//

#ifndef RNAOA11yCardView_h
#define RNAOA11yCardView_h

#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTViewComponentView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yCardView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END

#else

#import <React/RCTView.h>

@interface RNAOA11yCardView : RCTView
@end

#endif

#endif /* RNAOA11yCardView_h */
