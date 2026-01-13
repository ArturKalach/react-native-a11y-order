//
//  RNAOPropsHelper.h
//  Pods
//
//  Created by Artur Kalach on 15/08/2025.
//

#ifndef RNAOPropsHelper_h
#define RNAOPropsHelper_h

#include <string>

@interface RNAOPropsHelper : NSObject

+ (BOOL)isPropChanged:(NSString *)prop stringValue:(std::string)stringValue;
+ (BOOL)isPropChanged:(NSNumber *)prop intValue:(int)intValue;
+ (NSString*)unwrapStringValue:(std::string)stringValue;
+ (NSNumber*)unwrapIntValue:(int)intValue;

@end


#endif /* RNAOPropsHelper_h */
