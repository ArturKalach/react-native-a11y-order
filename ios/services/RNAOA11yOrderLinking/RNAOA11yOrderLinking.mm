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
  NSMutableDictionary<NSString *, RNAOA11yRelationship *> *_relationships;
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

- (RNAOA11yRelationship *)relationshipForKey:(NSString *)orderKey {
  RNAOA11yRelationship *relationship = _relationships[orderKey];
  if (relationship == nil) {
    relationship = [[RNAOA11yRelationship alloc] init];
    _relationships[orderKey] = relationship;
  }
  return relationship;
}

- (void)add:(NSNumber *)position withOrderKey:(NSString *)orderKey withObject:(NSObject *)obj {
  [[self relationshipForKey:orderKey] add:position withObject:obj];
}

- (void)remove:(NSNumber *)position withOrderKey:(NSString *)orderKey {
  RNAOA11yRelationship *relationship = _relationships[orderKey];
  if (relationship == nil) return;
  [relationship remove:position];
  if ([relationship isEmpty]) {
    [_relationships removeObjectForKey:orderKey];
  }
}

- (void)setContainer:(NSString *)orderKey withView:(UIView *)view withDebounce:(BOOL)debounced {
  [[self relationshipForKey:orderKey] setContainer:view withDebounce:debounced];
}

- (void)setContainer:(NSString *)orderKey withView:(UIView *)view {
  [self setContainer:orderKey withView:view withDebounce:NO];
}

- (void)update:(NSNumber *)position lastPosition:(NSNumber *)lastPosition withOrderKey:(NSString *)orderKey withView:(UIView *)view {
  [_relationships[orderKey] update:lastPosition withPosition:position withObject:view];
}

- (void)updateOrderKey:(NSString *)prev next:(NSString *)next position:(NSNumber *)position withView:(UIView *)view {
  if (prev != nil) {
    RNAOA11yRelationship *old = _relationships[prev];
    [old remove:position];
    if ([old isEmpty]) {
      [_relationships removeObjectForKey:prev];
    }
  }
  if (next != nil) {
    [[self relationshipForKey:next] add:position withObject:view];
  }
}

- (void)removeContainer:(NSString *)orderKey {
  RNAOA11yRelationship *relationship = _relationships[orderKey];
  if (relationship != nil) {
    UIView *container = [relationship getContainer];
    [_relationships removeObjectForKey:orderKey];
    [relationship clear];
    [container setAccessibilityElements:nil];
  }
}

@end
