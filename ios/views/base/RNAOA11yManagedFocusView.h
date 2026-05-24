#ifndef RNAOA11yManagedFocusView_h
#define RNAOA11yManagedFocusView_h

#import "RNAOA11yGroupChildrenView.h"
#import "RNAOA11yFocusService.h"

#ifdef RCT_NEW_ARCH_ENABLED

NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yManagedFocusView : RNAOA11yGroupChildrenView<RNAOA11yFocusServiceSubscriber>
@property BOOL descendantFocusChangedEnabled;
@end

NS_ASSUME_NONNULL_END

#else

@interface RNAOA11yManagedFocusView : RNAOA11yGroupChildrenView<RNAOA11yFocusServiceSubscriber>
@property BOOL descendantFocusChangedEnabled;
@property (nonatomic, copy) RCTDirectEventBlock onScreenReaderDescendantFocusChanged;
@property (nonatomic, copy) RCTDirectEventBlock onScreenReaderFocusChange;
@property (nonatomic, copy) RCTDirectEventBlock onScreenReaderFocused;
@end

#endif

#endif /* RNAOA11yManagedFocusView_h */
