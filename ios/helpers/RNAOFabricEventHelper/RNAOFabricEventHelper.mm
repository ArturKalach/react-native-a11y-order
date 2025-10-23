//
//  RNAOFabricEventHelper.m
//  boost-boost_privacy
//
//  Created by Artur Kalach on 21/10/2025.
//

#import <Foundation/Foundation.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <Foundation/Foundation.h>

#import "RNAOFabricEventHelper.h"

#import <react/renderer/components/RNA11yOrderSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNA11yOrderSpec/EventEmitters.h>
#import <react/renderer/components/RNA11yOrderSpec/Props.h>
#import <react/renderer/components/RNA11yOrderSpec/RCTComponentViewHelpers.h>

using namespace facebook::react;

@implementation RNAOFabricEventHelper
+ (void)onIndexViewFocusChange:(BOOL)isFocused withEmitter:(facebook::react::SharedViewEventEmitter) _eventEmitter {
    if (_eventEmitter) {
        auto viewEventEmitter = std::static_pointer_cast<A11yIndexViewEventEmitter const>(_eventEmitter);
        facebook::react::A11yIndexViewEventEmitter::OnScreenReaderFocusChange data = {
            .isFocused = isFocused,
        };
        viewEventEmitter->onScreenReaderFocusChange(data);
    };
}

+ (void)onA11yViewFocusChange:(BOOL)isFocused withEmitter:(facebook::react::SharedViewEventEmitter) _eventEmitter {
    if (_eventEmitter) {
        auto viewEventEmitter = std::static_pointer_cast<A11yViewEventEmitter const>(_eventEmitter);
        facebook::react::A11yViewEventEmitter::OnScreenReaderFocusChange data = {
            .isFocused = isFocused,
        };
        viewEventEmitter->onScreenReaderFocusChange(data);
    };
}


@end
#endif
