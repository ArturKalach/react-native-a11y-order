//
//  RNAOFocusChangeListener.m
//  react-native-a11y-order
//
//  Created by Artur Kalach on 07/01/2026.
//

#import <Foundation/Foundation.h>

#import "RNAOFocusChangeListener.h"
#import <UIKit/UIKit.h>

@interface RNAOFocusChangeListener ()
@property (nonatomic, weak) id<RNAOFocusChangeListenerDelegate> delegate;
@end

@implementation RNAOFocusChangeListener

- (instancetype)initWithDelegate:(id<RNAOFocusChangeListenerDelegate>)delegate {
    self = [super init];
    if (self) {
        _delegate = delegate;
    }
    return self;
}

- (void)startListening {
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onFocusChangeHandler:)
                                                 name:UIAccessibilityElementFocusedNotification
                                               object:nil];
}

- (void)stopListening {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)onFocusChangeHandler:(NSNotification *)notification {
    id focusedElement = notification.userInfo[UIAccessibilityFocusedElementKey];
    [self.delegate voiceOverFocusChanged:focusedElement];
}

- (void)dealloc {
    [self stopListening];
}

@end
