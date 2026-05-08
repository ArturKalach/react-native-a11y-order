#ifndef RNAOA11yAutoFocusView_h
#define RNAOA11yAutoFocusView_h

#import "RNAOA11yGroupChildrenView.h"
#import "RNAOA11yFocusService.h"

#ifdef RCT_NEW_ARCH_ENABLED

NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yAutoFocusView : RNAOA11yGroupChildrenView<RNAOA11yFocusServiceSubscriber>
@property BOOL autoFocus;
@property BOOL descendantFocusChangedEnabled;
@end

NS_ASSUME_NONNULL_END

#else

@interface RNAOA11yAutoFocusView : RNAOA11yGroupChildrenView<RNAOA11yFocusServiceSubscriber>
@property BOOL autoFocus;
@property BOOL descendantFocusChangedEnabled;
@property (nonatomic, copy) RCTDirectEventBlock onScreenReaderDescendantFocusChanged;
@property (nonatomic, copy) RCTDirectEventBlock onScreenReaderFocusChange;
@property (nonatomic, copy) RCTDirectEventBlock onScreenReaderFocused;
@end

#endif

#endif /* RNAOA11yAutoFocusView_h */
