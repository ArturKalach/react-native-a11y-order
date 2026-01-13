//
//  RNAOViewItemProtocol.h
//  Pods
//
//  Created by Artur Kalach on 21/10/2025.
//

#ifndef RNAOViewItemProtocol_h
#define RNAOViewItemProtocol_h

@protocol RNAOViewItemProtocol <NSObject>

- (void)onFocusItemLinked: (UIView*)view;
- (void)onFocusItemRemoved: (UIView*)view;

@end

#endif /* RNAOViewItemProtocol_h */
