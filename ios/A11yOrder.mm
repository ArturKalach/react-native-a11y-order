#import "A11yOrder.h"
#import <React/RCTLog.h>
#import <UIKit/UIKit.h>
#import <React/RCTUIManager.h>


#ifdef RCT_NEW_ARCH_ENABLED
#import "RNA11yOrderSpec/RNA11yOrderSpec.h"
using namespace facebook::react;

#endif

@implementation A11yOrder
{
    bool hasListeners;
}

RCT_EXPORT_MODULE()

-(void)startObserving {
    hasListeners = YES;
}

-(void)stopObserving {
    hasListeners = NO;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[];
}


RCT_EXPORT_METHOD(
                  setA11yOrder: (nonnull NSArray *)elements
                  node:(nonnull NSNumber *)node
                  ) {
    dispatch_async(dispatch_get_main_queue(), ^{
        UIView *field = [self.bridge.uiManager viewForReactTag:node];
        if(field != nil) {
            UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, field); // ToDo, make this optional
        }
        NSMutableArray *fields = [NSMutableArray arrayWithCapacity:[elements count]];
        
        [elements enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL * stop) {
            NSNumber *tag = (NSNumber *)obj;
            UIView *field = [self.bridge.uiManager viewForReactTag:tag];
            if (field != nil) {
                [fields addObject:field];
            }
        }];
        [field setAccessibilityElements: fields];
    });
}


+ (BOOL)requiresMainQueueSetup
{
    return YES;
}


// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeA11yOrderSpecJSI>(params);
}
#endif

@end
