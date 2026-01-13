//
//  RNAOA11yAnnounceQueue.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 07/01/2026.
//

#import <Foundation/Foundation.h>
#import "RNAOA11yAnnounceQueue.h"

@interface RNAOA11yAnnounceQueue ()
@property (nonatomic, strong) NSMutableArray<NSString *> *announceArray;
@end

@implementation RNAOA11yAnnounceQueue


- (BOOL)isEmpty {
  return _announceArray.count == 0;
}

- (NSArray<NSString *> *)list {
  return [_announceArray copy];
}

- (instancetype)init {
  if (self) {
    _announceArray = [[NSMutableArray alloc] init];
  }
  return self;
}

- (void)add:(NSString *)message {
  if (message.length != 0) {
    [_announceArray addObject: message];
  }
}

- (void)clear {
  [_announceArray removeAllObjects];
}

@end
