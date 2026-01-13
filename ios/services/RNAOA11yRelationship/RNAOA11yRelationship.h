//
//  RNAOA11yRelationship.h
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#ifndef RNAOA11yRelationship_h
#define RNAOA11yRelationship_h

#include "RNAODebouncer.h"

@interface RNAOA11yRelationship : NSObject

- (void)add:(NSNumber*)position withObject:(NSObject*)obj;
- (void)remove:(NSNumber*)position;
- (void)update:(NSNumber*)lastPosition withPosition:(NSNumber*)position withObject:(NSObject*)obj;
- (void)clear;
- (void)setContainer:(UIView*)view;
- (void)setContainer:(UIView*)view withDebounce:(BOOL)debounced;
- (UIView*)getContainer;

@property (nonatomic, strong) RNAODebouncer *debouncer;

@end


#endif /* RNAOA11yRelationship_h */
