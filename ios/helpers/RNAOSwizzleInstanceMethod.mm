//
//  RNAOSwizzleInstanceMethod.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 13/08/2025.
//

#import "RNAOSwizzleInstanceMethod.h"

void RNAOSwizzleInstanceMethod(Class swizzleClass, SEL originalSelector, SEL swizzledSelector) {
    Method originalMethod = class_getInstanceMethod(swizzleClass, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(swizzleClass, swizzledSelector);
    BOOL didAddMethod = class_addMethod(swizzleClass,
                                        originalSelector,
                                        method_getImplementation(swizzledMethod),
                                        method_getTypeEncoding(swizzledMethod));
    
    if (didAddMethod) {
        class_replaceMethod(swizzleClass,
                            swizzledSelector,
                            method_getImplementation(originalMethod),
                            method_getTypeEncoding(originalMethod));
    } else {
        method_exchangeImplementations(originalMethod, swizzledMethod);
    }
}
