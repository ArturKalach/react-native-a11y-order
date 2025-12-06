//
//  RNAOFabricEventHelper.h
//  Pods
//
//  Created by Artur Kalach on 21/10/2025.
//

#ifndef RNAOFabricEventHelper_h
#define RNAOFabricEventHelper_h

#import <react/renderer/components/RNA11yOrderSpec/ComponentDescriptors.h>

using namespace facebook::react;

@interface RNAOFabricEventHelper: NSObject

+ (void)onIndexViewFocusChange:(BOOL)isFocused withEmitter:(facebook::react::SharedViewEventEmitter) emitter;

+ (void)onA11yViewFocusChange:(BOOL)isFocused withEmitter:(facebook::react::SharedViewEventEmitter) emitter;
+ (void)onA11yViewFocused:(facebook::react::SharedViewEventEmitter) emitter;
+ (void)onA11yViewScreenReaderDescendantFocusChanged:(NSString*)status withId:nativeId withEmitter:(facebook::react::SharedViewEventEmitter) _eventEmitter;
@end

#endif /* RNCEKVFabricEventHelper_h */
