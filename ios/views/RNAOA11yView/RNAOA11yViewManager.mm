//
//  RNAOA11yViewManager.m
//  boost-boost_privacy
//
//  Created by Artur Kalach on 17/08/2025.
//

#import <Foundation/Foundation.h>

#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RNAOA11yView.h"
#import "RNAOA11yViewManager.h"

@implementation RNAOA11yViewManager

RCT_EXPORT_MODULE(A11yView)

- (UIView *)view
{
  return [[RNAOA11yView alloc] init];
}

RCT_EXPORT_METHOD(focus:(nonnull NSNumber *)reactTag)
{
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[UIView class]]) {
            return;
        }
      
        UIAccessibilityPostNotification(UIAccessibilityLayoutChangedNotification, view);
    }];
}

RCT_CUSTOM_VIEW_PROPERTY(autoFocus, BOOL, RNAOA11yView)
{
  BOOL value = json ? [RCTConvert BOOL:json] : NO;
  [view setAutoFocus: value];
}

RCT_EXPORT_VIEW_PROPERTY(onScreenReaderFocusChange, RCTDirectEventBlock)

@end
