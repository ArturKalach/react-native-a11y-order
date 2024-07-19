//
//  RNAOA11yIndexViewManager.m
//  Pods
//
//  Created by Artur Kalach on 13/07/2024.
//

#import <Foundation/Foundation.h>

#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RNAOA11yIndexViewManager.h"
//#import "RNAOA11yIndexViewManager.h"
#import "RCTBridge.h"


@implementation RNAOA11yIndexViewManager

RCT_EXPORT_MODULE(A11yIndexView)

- (UIView *)view
{
    return [[RNCEKVTextInputFocusWrapper alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(onFocusChange, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY(canBeFocused, BOOL, RNCEKVTextInputFocusWrapper)
{
    BOOL value =  json ? [RCTConvert BOOL:json] : YES;
    [view setCanBeFocused: value];
}

RCT_CUSTOM_VIEW_PROPERTY(focusType, int, RNCEKVTextInputFocusWrapper)
{
    int value =  json ? [RCTConvert int:json] : 0;
    [view setFocusType: value];
}

RCT_CUSTOM_VIEW_PROPERTY(blurType, int, RNCEKVTextInputFocusWrapper)
{
    int value =  json ? [RCTConvert int:json] : 0;
    [view setBlurType: value];
}

@end
