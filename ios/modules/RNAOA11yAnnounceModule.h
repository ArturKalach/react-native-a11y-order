//
//  RNAOA11yAnnounceModule.h
//  react-native-a11y-order
//

#ifndef RNAOA11yAnnounceModule_h
#define RNAOA11yAnnounceModule_h

#import <Foundation/Foundation.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNA11yOrderSpec/RNA11yOrderSpec.h>

@interface RNAOA11yAnnounceModule : NSObject <NativeA11yAnnounceModuleSpec>

#else

#import <React/RCTBridgeModule.h>

@interface RNAOA11yAnnounceModule : NSObject <RCTBridgeModule>

- (void)announce:(NSString *)message
         options:(NSDictionary *)options
         resolve:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject;

- (void)cancel:(NSString *)announcementId
        resolve:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject;

- (void)cancelAll:(RCTPromiseResolveBlock)resolve
           reject:(RCTPromiseRejectBlock)reject;

#endif

@end

#endif /* RNAOA11yAnnounceModule_h */
