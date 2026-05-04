//
//  RCTModalHostViewComponentView+RNAOA11yOrder.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 06/12/2025.
//

#import <Foundation/Foundation.h>
#import "RNAOSwizzleInstanceMethod.h"
#import "RNAOSwizzleInstall.h"
#import <objc/runtime.h>
#import "RNAOA11yAnnounceService.h"
#import "RCTModalHostViewComponentView+RNAOA11yOrder.h"

#ifdef RCT_NEW_ARCH_ENABLED


@implementation RCTModalHostViewComponentView (RNAOA11yOrder)

static void RNAORegisterModalPresentationSwizzles(void) {
    Class cls = objc_getClass("RCTModalHostViewComponentView");
    if (!cls) return;
    RNAOSwizzleInstanceMethod(cls,
              @selector(dismissViewController:animated:completion:),
              @selector(rnaoDismissViewController:animated:completion:));
    RNAOSwizzleInstanceMethod(cls,
          @selector(presentViewController:animated:completion:),
          @selector(rnaoPresentViewController:animated:completion:));
}

RNAO_INSTALL_SWIZZLES(RNAORegisterModalPresentationSwizzles)

- (void)rnaoPresentViewController:(UIViewController *)modalViewController
                        animated:(BOOL)animated
                      completion:(void (^)(void))completion
{
    [self rnaoPresentViewController:modalViewController animated:animated completion:completion];
    [[RNAOA11yAnnounceService shared] temporarilyLockAnnounce: 0.1];
}

- (void)rnaoDismissViewController:(UIViewController *)modalViewController
                        animated:(BOOL)animated
                      completion:(void (^)(void))completion
{
    [self rnaoDismissViewController:modalViewController animated:animated completion:completion];
    [[RNAOA11yAnnounceService shared] temporarilyLockAnnounce: 0.1];
}

@end

#else

@implementation RCTModalHostView (RNAOA11yOrder)

static void RNAORegisterModalPresentationSwizzles(void) {
    Class cls = objc_getClass("RCTModalHostView");
    if (!cls) return;
    RNAOSwizzleInstanceMethod(cls,
        @selector(ensurePresentedOnlyIfNeeded),
        @selector(rnao_ensurePresentedOnlyIfNeeded));
    RNAOSwizzleInstanceMethod(cls,
        @selector(dismissModalViewController),
        @selector(rnao_dismissModalViewController));
}

RNAO_INSTALL_SWIZZLES(RNAORegisterModalPresentationSwizzles)

- (void)rnao_ensurePresentedOnlyIfNeeded
{
    [self rnao_ensurePresentedOnlyIfNeeded];
    [[RNAOA11yAnnounceService shared] temporarilyLockAnnounce: 0.1];
}

- (void)rnao_dismissModalViewController
{
    [self rnao_dismissModalViewController];
    [[RNAOA11yAnnounceService shared] temporarilyLockAnnounce: 0.1];
}

@end

#endif
