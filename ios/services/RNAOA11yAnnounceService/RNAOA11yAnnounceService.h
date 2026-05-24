//
//  RNAOA11yAnnounceService.h
//  Pods
//
//  Created by Artur Kalach on 05/12/2025.
//

#ifndef RNAOA11yAnnounceService_h
#define RNAOA11yAnnounceService_h

#import <UIKit/UIKit.h>
#import "RNAOFocusChangeListener.h"

@interface RNAOA11yAnnounceService: NSObject<RNAOFocusChangeListenerDelegate>

+ (instancetype)shared;

/**
 * Enqueues `announcement` and schedules a navigation-aware debounced post.
 * `onFired` is called on the main queue when the service actually speaks
 * the announcement. Pass nil if no completion callback is needed.
 * If cancelAll is called before the service fires, `onFired` is NOT called.
 */
- (void)announce:(NSString *)announcement onFired:(nullable dispatch_block_t)onFired;

/** Convenience — equivalent to announce:onFired:nil. */
- (void)announce:(NSString *)announcement;

- (void)cancelAll;
- (void)temporarilyLockAnnounce;
- (void)temporarilyLockAnnounce:(NSTimeInterval)interval;

@end

#endif /* RNAOA11yAnnounceService_h */
