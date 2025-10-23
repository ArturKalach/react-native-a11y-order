//
//  RNAODebouncer.h
//  Pods
//
//  Created by Artur Kalach on 17/10/2025.
//

#ifndef RNAODebouncer_h
#define RNAODebouncer_h

@interface RNAODebouncer: NSObject

- (instancetype)initWithInterval:(NSTimeInterval)interval;

@property (nonatomic, strong) dispatch_queue_t queue;
@property (nonatomic, copy) void (^debounceBlock)(void);
@property (nonatomic, assign) NSTimeInterval debounceInterval;

- (void)debounceAction:(void (^)(void))action;

@end

#endif /* RNAODebouncer_h */
