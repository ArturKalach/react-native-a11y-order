//
//  RNAOSwizzleInstanceMethod.h
//  Pods
//
//  Created by Artur Kalach on 13/08/2025.
//

#ifndef RNAOSwizzleInstanceMethod_h
#define RNAOSwizzleInstanceMethod_h

#import <Foundation/Foundation.h>
#import <objc/runtime.h>

void RNAOSwizzleInstanceMethod(Class swizzleClass, SEL originalSelector, SEL swizzledSelector);


#endif /* RNAOSwizzleInstanceMethod_h */
