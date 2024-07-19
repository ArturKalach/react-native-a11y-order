//
//  RNAOA11yDirectionView.m
//  A11yOrder
//
//  Created by Artur Kalach on 13/07/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RNAOA11yOrderView.h"
#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import <React/RCTLog.h>
#import <React/RCTUITextField.h>
#import "RNAOA11yDirectionView.h"

#ifdef RCT_NEW_ARCH_ENABLED

#include <string>
#import <react/renderer/components/RNExternalKeyboardViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNExternalKeyboardViewSpec/EventEmitters.h>
#import <react/renderer/components/RNExternalKeyboardViewSpec/Props.h>
#import <react/renderer/components/RNExternalKeyboardViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNAOA11yDirectionView () <RCTTextInputFocusWrapperViewProtocol>

@end

#endif



@implementation RNAOA11yDirectionView  {
    UIStackView *_stackView;
    UIView *_contentView;
    BOOL _isSubviewAdded;
}


- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
          // Initialize the stack view with the same frame as the main view
          _stackView = [[UIStackView alloc] initWithFrame:self.bounds];
//          _stackView.axis = UILayoutConstraintAxisVertical;
        _stackView.axis = UILayoutConstraintAxisHorizontal;
          _stackView.alignment = UIStackViewAlignmentFill;
          _stackView.distribution = UIStackViewDistributionFill;
          _stackView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
          [self addSubview:_stackView];
      }
      return self;
}

- (void)removeReactSubview:(UIView *)subview
{
  [super removeReactSubview:subview];
  if(subview == _contentView)
  [_stackView removeArrangedSubview:subview];
  _contentView = nil;
}

- (void)addSubview:(UIView *)subview {
    RCTAssert(
        _contentView == nil,
        @"A11yDirrectionView may only contain a single subview, the already set subview looks like: %@",
        [_stackView react_recursiveDescription]);
    if(subview == _stackView){
        [super addSubview:subview];
    } else {
        _contentView = subview;
        [_stackView addArrangedSubview:subview];
    }
    
}

- (void)removeSubview:(UIView *)subview {
    RCTAssert(_contentView == subview, @"Attempted to remove non-existent subview");
   [_stackView removeArrangedSubview:subview];
}

- (void)willRemoveSubview:(UIView *)subview {
   [super willRemoveSubview:subview];
}


#ifdef RCT_NEW_ARCH_ENABLED
+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<TextInputFocusWrapperComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const TextInputFocusWrapperProps>();
        _props = defaultProps;
    }
    
    return self;
}


- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<TextInputFocusWrapperProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<TextInputFocusWrapperProps const>(props);
    [super updateProps
     :props oldProps:oldProps];
    
    if(oldViewProps.position != newViewProps.position) {
        [self setPosition: newViewProps.position];
    }
    
    if(oldViewProps.positionKey != newViewProps.positionKey) {
        [self setPositionKey: newViewProps.positionKey];
    }
}

Class<RCTComponentViewProtocol> TextInputFocusWrapperCls(void)
{
    return RNCEKVTextInputFocusWrapper.class;
}

#endif

@end
