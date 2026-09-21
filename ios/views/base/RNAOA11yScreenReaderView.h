#ifndef RNAOA11yScreenReaderView_h
#define RNAOA11yScreenReaderView_h

#import "RNAOA11yViewGroup.h"
#import "RNAOScreenReaderFocusDelegate.h"
#import "RNAOViewItemProtocol.h"


NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yScreenReaderView : RNAOA11yViewGroup<RNAOScreenReaderFocusDelegate, RNAOViewItemProtocol>
@end

NS_ASSUME_NONNULL_END


#endif /* RNAOA11yScreenReaderView_h */
