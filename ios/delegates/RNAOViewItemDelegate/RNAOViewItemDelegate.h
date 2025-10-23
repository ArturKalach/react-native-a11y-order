//
//  RNAOViewItemDelegate.h
//  Pods
//
//  Created by Artur Kalach on 21/10/2025.
//

#ifndef RNAOViewItemDelegate_h
#define RNAOViewItemDelegate_h

#import "RNAOViewItemProtocol.h"

@interface RNAOViewItemDelegate : NSObject

- (instancetype _Nonnull)initWithView:
(UIView<RNAOViewItemProtocol> *_Nonnull)delegate;

@property (nonatomic, weak) UIView *linkView;

- (void)willRemoveSubview:(UIView *)subview;
- (void)didAddSubview:(UIView *)subview;
- (void)finalizeUpdates;
- (void)prepareForRecycle;
- (void)layoutSubviews;

@end

#endif /* RNAOViewItemDelegate_h */
