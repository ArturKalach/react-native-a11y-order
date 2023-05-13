
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNA11yOrderSpec.h"

@interface A11yOrder : NSObject <NativeA11yOrderSpec>
#else
#import <React/RCTBridgeModule.h>

@interface A11yOrder : NSObject <RCTBridgeModule>
#endif

@end
