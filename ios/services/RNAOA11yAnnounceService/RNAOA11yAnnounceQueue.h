//
//  RNAOA11yAnnounceQueue.h
//  Pods
//
//  Created by Artur Kalach on 07/01/2026.
//

#ifndef RNAOA11yAnnounceQueue_h
#define RNAOA11yAnnounceQueue_h

@interface RNAOA11yAnnounceQueue: NSObject

@property (nonatomic, assign, readonly) BOOL isEmpty;
@property (nonatomic, strong, readonly) NSArray<NSString *> *list;

- (void)add:(NSString *)message;
- (void)clear;

@end


#endif /* RNAOA11yAnnounceQueue_h */
