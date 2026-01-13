//
//  RNAOSortedMap.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RNAOSortedMap.h"

@implementation RNAOSortedMap {
  NSMapTable *_dictionary;
  NSMutableArray<NSNumber *> *_sortedKeys;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    _dictionary = [NSMapTable strongToWeakObjectsMapTable];
    _sortedKeys = [NSMutableArray array];
  }
  return self;
}

- (void)updateSortedKey:(NSNumber*)position {
  if([_sortedKeys count] == 0) {
    [_sortedKeys addObject: position];
  } else {
    NSInteger indexOfFirstLarger = -1;
    
    for (NSInteger i = 0; i < _sortedKeys.count; i++) {
      NSNumber *number = _sortedKeys[i];
      if ([number integerValue] > [position integerValue]) {
        indexOfFirstLarger = i;
        break;
      }
    }
    
    
    if(indexOfFirstLarger == -1) {
      [_sortedKeys addObject: position];
    } else {
      [_sortedKeys insertObject:position atIndex:indexOfFirstLarger];
    }
  }
}

- (void)put:(NSNumber*)position withObject:(NSObject*)obj {
  if([_dictionary objectForKey:position] == nil) {
    [self updateSortedKey: position];
  }
  [_dictionary setObject: obj forKey:position];
}

- (void)remove:(NSNumber*)position {
  NSUInteger positionIndex = [_sortedKeys indexOfObject:position];
  if (positionIndex != NSNotFound) {
    [_sortedKeys removeObjectAtIndex:positionIndex];
  }
  [_dictionary removeObjectForKey:position];
}


- (void)remove:(NSNumber*)position withObject:(NSObject*)obj {
  if([_dictionary objectForKey:position] == obj) {
    NSUInteger positionIndex = [_sortedKeys indexOfObject:position];
    if (positionIndex != NSNotFound) {
      [_sortedKeys removeObjectAtIndex:positionIndex];
    }
    [_dictionary removeObjectForKey:position];
  }
}

- (void)clear {
  [_dictionary removeAllObjects];
  [_sortedKeys removeAllObjects];
}

- (void)update:(NSNumber*)lastPosition withPosition:(NSNumber*)position withObject:(NSObject*)obj {
  [self remove:lastPosition withObject: obj];
  [self put:position withObject:obj];
}

- (NSArray*)getValues {
  NSMutableArray *result = [NSMutableArray arrayWithCapacity:_sortedKeys.count];
  for (NSNumber *key in _sortedKeys) {
    NSObject *object = [_dictionary objectForKey:key];
    if (object) {
      [result addObject:object];
    }
  }
  return result;
}

@end
