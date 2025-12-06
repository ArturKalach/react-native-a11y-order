//
//  RNAOA11yAnnounceService.h
//  Pods
//
//  Created by Artur Kalach on 05/12/2025.
//

#ifndef RNAOA11yAnnounceService_h
#define RNAOA11yAnnounceService_h

#import <UIKit/UIKit.h>


@interface RNAOA11yAnnounceService: NSObject

+ (instancetype)shared;
- (void)announce:(NSString *)announcement;

@property (nonatomic, assign) BOOL announceLock;

@end

#endif /* RNAOA11yAnnounceService_h */
