#ifndef RNAOA11yGroupChildrenView_h
#define RNAOA11yGroupChildrenView_h

#import "RNAOA11yScreenReaderView.h"

#ifdef RCT_NEW_ARCH_ENABLED
NS_ASSUME_NONNULL_BEGIN
#endif

// groupChildrenMode: -1 = defer to super (default), 0 = NO, 1 = YES
@interface RNAOA11yGroupChildrenView : RNAOA11yScreenReaderView

@property (nonatomic) int groupChildrenMode;

@end

#ifdef RCT_NEW_ARCH_ENABLED
NS_ASSUME_NONNULL_END
#endif

#endif /* RNAOA11yGroupChildrenView_h */