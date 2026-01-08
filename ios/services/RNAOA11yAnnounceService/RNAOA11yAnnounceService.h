//
//  RNAOA11yAnnounceService.h
//  Pods
//
//  Created by Artur Kalach on 05/12/2025.
//

#ifndef RNAOA11yAnnounceService_h
#define RNAOA11yAnnounceService_h

#import <UIKit/UIKit.h>
#import "RNAOFocusChangeListener.h"

@interface RNAOA11yAnnounceService: NSObject<RNAOFocusChangeListenerDelegate>

+ (instancetype)shared;

- (void)announce:(NSString *)announcement;
- (void)temporarilyLockAnnounce;
- (void)temporarilyLockAnnounce:(NSTimeInterval)interval;
//@property (nonatomic, assign) BOOL announceLock;

@end

#endif /* RNAOA11yAnnounceService_h */
