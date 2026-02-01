//
//  RNAOA11yAnnounceModule.h
//  Pods
//
//  Created by Artur Kalach on 06/12/2025.
//

#ifndef RNAOA11yAnnounceModule_h
#define RNAOA11yAnnounceModule_h


#import <Foundation/Foundation.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNA11yOrderSpec/RNA11yOrderSpec.h>

@interface RNAOA11yAnnounceModule : NSObject <NativeA11yAnnounceModuleSpec>

@end

#else

#import <React/RCTBridgeModule.h>


@interface RNAOA11yAnnounceModule : NSObject <RCTBridgeModule>

- (void)announce:(NSString *)message;

@end

#endif

#endif /* RNAOA11yAnnounceModule_h */
