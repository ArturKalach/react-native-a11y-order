//
//  RNAOA11yAnnounceHelper.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 07/01/2026.
//

#import <Foundation/Foundation.h>
#import "RNAOA11yAnnounceHelper.h"

@implementation RNAOA11yAnnounceHelper

+ (void)announce:(NSString *)announcement {
  NSDictionary *attributes = @{ UIAccessibilitySpeechAttributeQueueAnnouncement : @YES };
  
  NSAttributedString *attributedAnnouncement = [[NSAttributedString alloc] initWithString:announcement attributes:attributes];
  
  UIAccessibilityPostNotification(UIAccessibilityAnnouncementNotification, attributedAnnouncement);
}

+ (void)announceWithList: (NSArray<NSString *> *)list {
  for (NSString *announcement in list) {
    [self announce: announcement];
  }
}


@end
