//
//  RNAOA11yItemDelegate.h
//  Pods
//
//  Created by Artur Kalach on 01/10/2025.
//

#ifndef RNAOA11yItemDelegate_h
#define RNAOA11yItemDelegate_h

#import "RNAOViewItemProtocol.h"

@interface RNAOA11yItemDelegate : NSObject

- (instancetype _Nonnull)initWithView:
(UIView<RNAOViewItemProtocol> *_Nonnull)delegate;

@property (nonatomic, weak) UIView *linkView;
@property (atomic, strong) NSNumber* position;
@property NSString* orderKey;
@property NSNumber* orderFocusType;

- (void)willRemoveSubview:(UIView *)subview;
- (void)didAddSubview:(UIView *)subview;
- (void)finalizeUpdates;
- (void)clear;

@end


#endif /* RNAOA11yItemDelegate_h */
