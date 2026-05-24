#ifndef RNAOA11yScreenReaderView_h
#define RNAOA11yScreenReaderView_h

#import "RNAOA11yViewGroup.h"
#import "RNAOScreenReaderFocusDelegate.h"
#import "RNAOViewItemProtocol.h"

#ifdef RCT_NEW_ARCH_ENABLED

NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yScreenReaderView : RNAOA11yViewGroup<RNAOScreenReaderFocusDelegate, RNAOViewItemProtocol>
@end

NS_ASSUME_NONNULL_END

#else

@interface RNAOA11yScreenReaderView : RNAOA11yViewGroup<RNAOScreenReaderFocusDelegate, RNAOViewItemProtocol>
@end

#endif

#endif /* RNAOA11yScreenReaderView_h */
