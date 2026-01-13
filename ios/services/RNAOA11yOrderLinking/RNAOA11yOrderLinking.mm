//
//  RNAOA11yOrderLinking.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RNAOA11yOrderLinking.h"
#import "RNAOA11yRelationship.h"

@implementation RNAOA11yOrderLinking {
    NSMutableDictionary *_relationships;
}

+ (instancetype)sharedInstance {
    static RNAOA11yOrderLinking *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];
    });
    return sharedInstance;
}

- (id)init {
  if (self = [super init]) {
      _relationships = [NSMutableDictionary dictionary];
  }

  return self;
}

- (void)add:(NSNumber*)position withOrderKey:(NSString*)orderKey withObject:(NSObject*)obj {
    RNAOA11yRelationship* relationship = [_relationships objectForKey: orderKey];
    if(relationship == nil) {
        relationship = [[RNAOA11yRelationship alloc] init];
        [_relationships setObject: relationship forKey:orderKey];
    }
    [relationship add:position withObject:obj];
}

-(void)remove:(NSNumber*)position withOrderKey:(NSString*)orderKey {
    RNAOA11yRelationship* relationship = [_relationships objectForKey: orderKey];
    if(relationship != nil) {
        [relationship remove:position];
    }
}

-(void)setContainer:(NSString*)orderKey withView:(UIView*)view withDebounce:(BOOL)debounced {
    RNAOA11yRelationship* relationship = [_relationships objectForKey: orderKey];
    if(relationship == nil) {
        relationship = [[RNAOA11yRelationship alloc] init];
        [_relationships setObject: relationship forKey:orderKey];
    }

    [relationship setContainer:view withDebounce: debounced];
}

- (void)setContainer:(NSString*)orderKey withView:(UIView*)view {
  [self setContainer: orderKey withView:view withDebounce: NO];
}

- (void)update:(NSNumber*)position lastPosition:(NSNumber*)lastPosition withOrderKey:(NSString*)orderKey withView:(UIView*) view {
    RNAOA11yRelationship* relationship = [_relationships objectForKey: orderKey];
    if(relationship != nil) {
        [relationship update:lastPosition withPosition:position withObject:view];
    }
}

- (void)removeContainer:(NSString*)orderKey {
    RNAOA11yRelationship* relationship = [_relationships objectForKey: orderKey];
    if(relationship != nil) {
        [_relationships removeObjectForKey:orderKey];
        [relationship clear];
    }
    [self setAccessibilityElements: nil];
}

-(UIView*)getContainer:(NSString*)orderKey withView:(UIView*) view {
    RNAOA11yRelationship* relationship = [_relationships objectForKey: orderKey];
    if(relationship != nil) {
        return [relationship getContainer];
    }

    return nil;
}


@end
