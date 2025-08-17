//
//  UIViewController+RNAOA11yOrder.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 13/08/2025.
//

#import <Foundation/Foundation.h>


#import <Foundation/Foundation.h>

#import "UIViewController+RNAOA11yOrder.h"
#import "RNAOSwizzleInstanceMethod.h"
#import <objc/runtime.h>





@implementation UIViewController (RNAOA11yOrder)

+ (void)load
{
    static dispatch_once_t once_token;

    dispatch_once(&once_token, ^{
      RNAOSwizzleInstanceMethod([self class], @selector(viewDidAppear:), @selector(rnaoViewDidAppear:));
      RNAOSwizzleInstanceMethod([self class], @selector(viewWillAppear:), @selector(rnaoViewWillAppear:));
    });
}

- (void)rnaoViewDidAppear:(BOOL)animated {
    [self rnaoViewDidAppear:animated];
    [[NSNotificationCenter defaultCenter] postNotificationName:@"RNAOViewControllerChangedNotification" object:self];
}

- (void)rnaoViewWillAppear:(BOOL)animated {
  [self rnaoViewWillAppear:animated];
}

@end
