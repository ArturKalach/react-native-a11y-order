//
//  RNAOA11yRelationship.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RNAOA11yRelationship.h"
#import "RNAOSortedMap.h"
#import "RNAODebouncer.h"

@implementation RNAOA11yRelationship {
  __weak UIView *_container;
  RNAOSortedMap *_positions;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    _positions = [[RNAOSortedMap alloc] init];
  }
  return self;
}

- (void)updateAccessibilityElements {
  if (_container != nil) {
    [_container setAccessibilityElements:[_positions getValues]];
  }
}

- (void)scheduleAccessibilityUpdate {
  if (self.debouncer) {
    [self.debouncer debounceAction:^{ [self updateAccessibilityElements]; }];
  } else {
    [self updateAccessibilityElements];
  }
}

- (void)add:(NSNumber *)position withObject:(NSObject *)obj {
  [_positions put:position withObject:obj];
  [self scheduleAccessibilityUpdate];
}

- (void)remove:(NSNumber *)position {
  [_positions remove:position];
  [self scheduleAccessibilityUpdate];
}

- (void)update:(NSNumber *)lastPosition withPosition:(NSNumber *)position withObject:(NSObject *)obj {
  [_positions update:lastPosition withPosition:position withObject:obj];
  [self scheduleAccessibilityUpdate];
}

- (void)setContainer:(UIView *)view {
  _container = view;
  [self updateAccessibilityElements];
}

- (void)setContainer:(UIView *)view withDebounce:(BOOL)debounced {
  if (debounced && !self.debouncer) {
    self.debouncer = [[RNAODebouncer alloc] initWithInterval:0.01];
  }
  [self setContainer:view];
}

- (void)clear {
  [_positions clear];
}

- (UIView *)getContainer {
  return _container;
}

- (BOOL)isEmpty {
  return [_positions isEmpty];
}

@end
