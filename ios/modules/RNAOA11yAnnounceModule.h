//
//  RNAOAnnounceModule.h
//  Pods
//
//  Created by Artur Kalach on 06/12/2025.
//

#ifndef RNAOAnnounceModule_h
#define RNAOAnnounceModule_h


#import <Foundation/Foundation.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNA11yOrderSpec/RNA11yOrderSpec.h>

@interface RNAOAnnounceModule : NSObject <NativeA11yAnnounceModuleSpec>

@end

#else

#import <React/RCTBridgeModule.h>


@interface RNAOAnnounceModule : NSObject <RCTBridgeModule>

- (void)announce:(NSString *)message;

@end

#endif

#endif /* RNAOAnnounceModule_h */
