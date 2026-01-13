//
//  RNAOScreenReaderFocusDelegate.h
//  Pods
//
//  Created by Artur Kalach on 21/10/2025.
//

#ifndef RNAOScreenReaderFocusDelegate_h
#define RNAOScreenReaderFocusDelegate_h

@protocol RNAOScreenReaderFocusDelegate <NSObject>

- (void)onScreenReaderFocusChanged:(BOOL)focused;

@end

#endif /* RNAOScreenReaderFocusDelegate_h */
