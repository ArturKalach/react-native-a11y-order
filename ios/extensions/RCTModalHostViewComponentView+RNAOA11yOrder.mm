//
//  RCTModalHostViewComponentView+RNAOA11yOrder.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 06/12/2025.
//

#import <Foundation/Foundation.h>
#import "RNAOSwizzleInstanceMethod.h"
#import <objc/runtime.h>
#import "RNAOA11yAnnounceService.h"
#import "RCTModalHostViewComponentView+RNAOA11yOrder.h"

#ifdef RCT_NEW_ARCH_ENABLED


@implementation RCTModalHostViewComponentView (RNAOA11yOrder)

+ (void)load
{
    static dispatch_once_t once_token;

    dispatch_once(&once_token, ^{
      RNAOSwizzleInstanceMethod([self class],
                @selector(dismissViewController:animated:completion:),
                @selector(rnaoDismissViewController:animated:completion:));
      RNAOSwizzleInstanceMethod([self class],
          @selector(presentViewController:animated:completion:),
          @selector(rnaoPresentViewController:animated:completion:));
    });
}

- (void)rnaoPresentViewController:(UIViewController *)modalViewController
                        animated:(BOOL)animated
                      completion:(void (^)(void))completion
{
    [self rnaoPresentViewController:modalViewController animated:animated completion:completion];
    [RNAOA11yAnnounceService shared].announceLock = false;
}

- (void)rnaoDismissViewController:(UIViewController *)modalViewController
                        animated:(BOOL)animated
                      completion:(void (^)(void))completion
{
    [self rnaoDismissViewController:modalViewController animated:animated completion:completion];
    [RNAOA11yAnnounceService shared].announceLock = false;
}

@end

#else

@implementation RCTModalHostView (RNAOA11yOrder)

+ (void)load
{
    static dispatch_once_t once_token;
    dispatch_once(&once_token, ^{
        RNAOSwizzleInstanceMethod([self class],
            @selector(ensurePresentedOnlyIfNeeded),
            @selector(rnao_ensurePresentedOnlyIfNeeded));
        RNAOSwizzleInstanceMethod([self class],
            @selector(dismissModalViewController),
            @selector(rnao_dismissModalViewController));
    });
}

- (void)rnao_ensurePresentedOnlyIfNeeded
{
    [self rnao_ensurePresentedOnlyIfNeeded];
    [RNAOA11yAnnounceService shared].announceLock = false;
}

- (void)rnao_dismissModalViewController
{
    [self rnao_dismissModalViewController];
    [RNAOA11yAnnounceService shared].announceLock = false;
}

@end

#endif
