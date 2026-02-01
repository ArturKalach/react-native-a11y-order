//
//  RNAOA11yAnnounceModule.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 06/12/2025.
//

#import <Foundation/Foundation.h>
#import "RNAOA11yAnnounceModule.h"
#import "RNAOA11yAnnounceService.h"

#ifdef RCT_NEW_ARCH_ENABLED

using namespace facebook::react;

#endif

@implementation RNAOA11yAnnounceModule


+ (BOOL)requiresMainQueueSetup
{
    return YES;
}


RCT_EXPORT_MODULE(A11yAnnounceModule);

RCT_EXPORT_METHOD(announce: (nonnull NSString*) title) {
  [[RNAOA11yAnnounceService shared] announce: title];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeA11yAnnounceModuleSpecJSI>(params);
}

#endif
@end

