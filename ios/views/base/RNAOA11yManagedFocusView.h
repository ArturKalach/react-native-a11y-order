#ifndef RNAOA11yManagedFocusView_h
#define RNAOA11yManagedFocusView_h

#import "RNAOA11yGroupChildrenView.h"
#import "RNAOA11yFocusService.h"


NS_ASSUME_NONNULL_BEGIN

@interface RNAOA11yManagedFocusView : RNAOA11yGroupChildrenView<RNAOA11yFocusServiceSubscriber>
@property BOOL descendantFocusChangedEnabled;
@end

NS_ASSUME_NONNULL_END


#endif /* RNAOA11yManagedFocusView_h */
