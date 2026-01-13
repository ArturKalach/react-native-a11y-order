//
//  RNAOA11yView.m
//  boost-boost_privacy
//
//  Created by Artur Kalach on 17/08/2025.
//

#import <Foundation/Foundation.h>

#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import "RNAOA11yView.h"
#import "UIView+RNAOA11yOrder.h"
#import "RNAOScreenReaderFocusDelegate.h"
#import "RNAOViewItemDelegate.h"
#import "RNAOA11yFocusService.h"
#import <React/UIView+React.h>

#ifdef RCT_NEW_ARCH_ENABLED

#include <string>
#import <react/renderer/components/RNA11yOrderSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNA11yOrderSpec/EventEmitters.h>
#import <react/renderer/components/RNA11yOrderSpec/Props.h>
#import <react/renderer/components/RNA11yOrderSpec/RCTComponentViewHelpers.h>
#import "RCTFabricComponentsPlugins.h"
#import "RNAOPropsHelper.h"
#import "RNAOFabricEventHelper.h"

using namespace facebook::react;

@interface RNAOA11yView () <RCTA11yViewViewProtocol>

@end

#endif



@implementation RNAOA11yView {
  BOOL _needsAutoFocus;
  RNAOViewItemDelegate* _viewDelegate;
  BOOL _descendantFocusChangedEnabled;
}


- (void)setDescendantFocusChangedEnabled: (BOOL)descendantFocusChangedEnabled {
  _descendantFocusChangedEnabled = descendantFocusChangedEnabled;
  if (_descendantFocusChangedEnabled) {
    if (self.superview) {
      [[RNAOA11yFocusService sharedService] subscribe:self];
    }
  } else {
    [[RNAOA11yFocusService sharedService] unsubscribe:self];
  }
}

- (BOOL)descendantFocusChangedEnabled {
  return _descendantFocusChangedEnabled;
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)prepareForRecycle
{
  [super prepareForRecycle];
  _needsAutoFocus = YES;
  _autoFocus = NO;
  [_viewDelegate prepareForRecycle];
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<A11yViewComponentDescriptor>();
}

- (void)finalizeUpdates:(RNComponentViewUpdateMask)updateMask {
  [super finalizeUpdates:updateMask];
  [_viewDelegate finalizeUpdates];
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const A11yViewProps>();
    _props = defaultProps;
    _needsAutoFocus = YES;
    _descendantFocusChangedEnabled = NO;
    _viewDelegate = [[RNAOViewItemDelegate alloc] initWithView: self];
  }
  
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<A11yViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<A11yViewProps const>(props);
  [super updateProps
   :props oldProps:oldProps];
  
  if (_autoFocus != newViewProps.autoFocus) {
    [self setAutoFocus: newViewProps.autoFocus];
  }
  if (_descendantFocusChangedEnabled != newViewProps.descendantFocusChangedEnabled) {
    [self setDescendantFocusChangedEnabled: newViewProps.descendantFocusChangedEnabled];
  }
  
}


- (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args {
  NSString *FOCUS = @"focus";
  if([commandName isEqual:FOCUS]) {
    [self focusView];
  }
}

Class<RCTComponentViewProtocol> A11yViewCls(void)
{
  return RNAOA11yView.class;
}

#else

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    _needsAutoFocus = YES;
    _viewDelegate = [[RNAOViewItemDelegate alloc] initWithView: self];
  }
  
  return self;
}

#endif


#ifdef RCT_NEW_ARCH_ENABLED
- (void)onScreenReaderFocusChangeHandler:(BOOL)isFocused {
  [RNAOFabricEventHelper onA11yViewFocusChange:isFocused withEmitter:_eventEmitter];
}
#else
- (void)onScreenReaderFocusChangeHandler:(BOOL)isFocused {
  if (self.onScreenReaderFocusChange) {
    self.onScreenReaderFocusChange(@{@"isFocused" : @(isFocused)});
  }
}
#endif

#ifdef RCT_NEW_ARCH_ENABLED
- (void)onScreenReaderDescendantFocusChangedHandler:(BOOL)isFocused withId:(NSString*) nativeId{
  NSString* status = isFocused ? @"focused" : @"blurred";
  [RNAOFabricEventHelper onA11yViewScreenReaderDescendantFocusChanged:status withId:nativeId withEmitter:_eventEmitter];
}
#else
- (void)onScreenReaderDescendantFocusChangedHandler:(BOOL)isFocused withId:(NSString*) nativeId{
  if (self.onScreenReaderDescendantFocusChanged) {
    NSString* status = isFocused ? @"focused" : @"blurred";
    self.onScreenReaderDescendantFocusChanged(@{@"status": status, @"nativeId": nativeId});
  }
}
#endif


#ifdef RCT_NEW_ARCH_ENABLED
- (void)onScreenReaderFocusedHandler {
  [RNAOFabricEventHelper onA11yViewFocused: _eventEmitter];
}
#else
- (void)onScreenReaderFocusedHandler {
  if (self.onScreenReaderFocused) {
    self.onScreenReaderFocused(@{});
  }
}
#endif

- (void)accessibilityElementDidBecomeFocused {
  [super accessibilityElementDidBecomeFocused];
  [self onScreenReaderFocusedHandler];
}

- (void)focusView {
  dispatch_async(dispatch_get_main_queue(), ^{
    UIAccessibilityPostNotification(UIAccessibilityLayoutChangedNotification, self);
  });
  
}

- (void)focus {
  [self focusView];
}

- (void)didMoveToWindow {
  [super didMoveToWindow];
  
  if (self.window) {
    if(_needsAutoFocus && _autoFocus) {
      _needsAutoFocus = NO;
      dispatch_async(dispatch_get_main_queue(), ^{
        [self focusView];
      });
    }
  }
}

- (void)didMoveToSuperview {
  [super didMoveToSuperview];
  if (self.descendantFocusChangedEnabled && self.superview) {
    [[RNAOA11yFocusService sharedService] subscribe:self];
  }
}

- (void)removeFromSuperview {
  [[RNAOA11yFocusService sharedService] unsubscribe:self];
  [super removeFromSuperview];
}



#ifdef RCT_NEW_ARCH_ENABLED
- (NSString*)getNativeId:(UIView*)element {
  NSString* nativeId = nil;
  @try {
    nativeId = [element valueForKey:@"_nativeId"];
  } @catch (NSException *exception) {
    nativeId = nil;
  }
  
  return nativeId;
}
#else
- (NSString*)getNativeId:(UIView*)element {
  return element.nativeID;
}
#endif

- (void)accessibilityElementDidBecomeFocused:(UIView*)element {
  NSString* nativeId = [self getNativeId: element];
  [self onScreenReaderDescendantFocusChangedHandler: true withId:nativeId];
}

- (void)accessibilityElementDidUnfocused:(UIView*)element {
  NSString* nativeId = [self getNativeId: element];
  [self onScreenReaderDescendantFocusChangedHandler: false withId:nativeId];
}


- (void)willRemoveSubview:(UIView *)subview {
  [super willRemoveSubview:subview];
  [_viewDelegate willRemoveSubview: subview];
}

- (void)didAddSubview:(UIView *)subview {
  [super didAddSubview:subview];
  [_viewDelegate didAddSubview: subview];
}

#ifndef RCT_NEW_ARCH_ENABLED
- (void)layoutSubviews {
  [super layoutSubviews];
  [_viewDelegate layoutSubviews];
}
#endif

- (void)onFocusItemLinked: (UIView*)view {
  [view setScreenReaderFocusDelegate: self];
}

- (void)onFocusItemRemoved: (UIView*)view {
  [view clearScreenReaderFocusDelegate];
}

- (void)onScreenReaderFocusChanged:(BOOL)focused {
  [self onScreenReaderFocusChangeHandler: focused];
}

@end
