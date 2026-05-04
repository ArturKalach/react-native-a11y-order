//
//  RNAOSortedMap.h
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#ifndef RNAOSortedMap_h
#define RNAOSortedMap_h

@interface RNAOSortedMap : NSObject

- (void)put:(NSNumber*)position withObject:(NSObject*)obj;
- (void)remove:(NSNumber*)position;
- (void)update:(NSNumber*)lastPosition withPosition:(NSNumber*)position withObject:(NSObject*)obj;
- (void)clear;
- (NSArray*)getValues;
- (BOOL)isEmpty;

@end

#endif /* RNAOSortedMap_h */
