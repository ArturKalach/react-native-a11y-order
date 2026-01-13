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
    BOOL _debounced;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _positions = [[RNAOSortedMap alloc] init];
        _container = nil;
        _debounced = false;
        self.debouncer = [[RNAODebouncer alloc] initWithInterval: 0.01];
    }
    return self;
}

- (void)add:(NSNumber*)position withObject:(NSObject*)obj {
    [_positions put:position withObject:obj];
    if(_debounced) {
      [self.debouncer debounceAction:^{
        [self updateAccessibilityElements];
      }];
    }
}

- (void)updateAccessibilityElements {
  if(_container != nil) {
    [_container setAccessibilityElements: [_positions getValues]];
  }
}

-(void)remove:(NSNumber*)position {
    [_positions remove:position];
}

-(void)setContainer:(UIView*)view {
    _container = view;
    [self updateAccessibilityElements];
}

- (void)setContainer:(UIView*)view withDebounce:(BOOL)debounced {
  [self setContainer: view];
  _debounced = debounced;
}

- (void)update:(NSNumber*)lastPosition withPosition:(NSNumber*)position withObject:(NSObject*)obj {
    [_positions update:lastPosition withPosition:position withObject:obj];
    [self updateAccessibilityElements];
}

-(void)clear {
    [_positions clear];
}

-(UIView*)getContainer {
    return _container;
}


@end
