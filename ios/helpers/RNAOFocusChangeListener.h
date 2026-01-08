//
//  RNAOFocusChangeListener.h
//  Pods
//
//  Created by Artur Kalach on 07/01/2026.
//

#ifndef RNAOFocusChangeListenerDelegate_h
#define RNAOFocusChangeListenerDelegate_h

#import <Foundation/Foundation.h>

@protocol RNAOFocusChangeListenerDelegate <NSObject>
- (void)voiceOverFocusChanged:(id)focusedElement;
@end

@interface RNAOFocusChangeListener : NSObject

- (instancetype)initWithDelegate:(id<RNAOFocusChangeListenerDelegate>)delegate;
- (void)startListening;
- (void)stopListening;

@end

#endif /* RNAOFocusChangeListener_h */
