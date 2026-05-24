//
//  RNAOSpeechAttributes.h
//  react-native-a11y-order
//

#ifndef RNAOSpeechAttributes_h
#define RNAOSpeechAttributes_h

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * Builds an NSAttributedString suitable for UIAccessibilityPostNotification
 * from a flat options dictionary. Keys consumed:
 *
 *   priority     NSString  "low" | "default" | "high" | "critical"
 *   queue        NSNumber  BOOL (defaults to YES; "critical" forces NO)
 *   language     NSString  BCP-47 tag
 *   pitch        NSNumber  0.0–2.0 (skipped at 1.0 ± 0.001)
 *   spellOut     NSNumber  BOOL
 *   punctuation  NSNumber  BOOL
 *   ipaNotation  NSString
 */
@interface RNAOSpeechAttributes : NSObject

+ (NSAttributedString *)attributedStringFor:(NSString *)message
                                    options:(NSDictionary *)options;

@end

NS_ASSUME_NONNULL_END

#endif /* RNAOSpeechAttributes_h */
