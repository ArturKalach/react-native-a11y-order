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
    NSMutableDictionary *_dirctionary;
    NSMutableArray *_sortedKeys;
    NSMutableArray *_cachedResult;
    BOOL _hasBeenChanged;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _dirctionary = [NSMutableDictionary dictionary];
        _sortedKeys = [NSMutableArray array];
        _cachedResult = [NSMutableArray array];
        _hasBeenChanged = YES;
    }
    return self;
}

- (void)put:(NSNumber*)position withObject:(NSObject*)obj {
    _hasBeenChanged = YES;
    [_dirctionary setObject: obj forKey:position];
    
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

- (void)remove:(NSNumber*)position {
    _hasBeenChanged = YES;
    NSUInteger positionIndex = [_sortedKeys indexOfObject:position];
    if (positionIndex != NSNotFound) {
        [_sortedKeys removeObjectAtIndex:positionIndex];
    }
    [_dirctionary removeObjectForKey:position];
}

- (NSArray*)getValues {
    if(_hasBeenChanged) {
        [_cachedResult removeAllObjects];
        for (NSNumber *itemPosition in _sortedKeys) {
            NSObject *item = [_dirctionary objectForKey:itemPosition];
            if(item != nil) {
              [_cachedResult addObject:item];
            }
        }
        return _cachedResult;
    } else {
        return _cachedResult;
    }
}

@end
