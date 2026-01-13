//
//  RNAOA11yAnnounceHelper.h
//  Pods
//
//  Created by Artur Kalach on 07/01/2026.
//

#ifndef RNAOA11yAnnounceHelper_h
#define RNAOA11yAnnounceHelper_h

@interface RNAOA11yAnnounceHelper: NSObject

+ (void)announce: (NSString *)announcement;
+ (void)announceWithList: (NSArray<NSString *> *)list;

@end


#endif /* RNAOA11yAnnounceHelper_h */
