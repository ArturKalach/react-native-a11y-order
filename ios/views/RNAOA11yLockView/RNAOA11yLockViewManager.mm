//
//  RNAOA11yLockViewManager.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 29/11/2025.
//

#import <Foundation/Foundation.h>


#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RNAOA11yLockView.h"
#import "RNAOA11yLockViewManager.h"

@implementation RNAOA11yLockViewManager

RCT_EXPORT_MODULE(A11yLock)

- (UIView *)view
{
  return [[RNAOA11yLockView alloc] init];
}

@end
