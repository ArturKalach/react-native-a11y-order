import React from 'react';
import A11yViewNativeComponent from '../../nativeSpecs/A11yViewNativeComponent';
import type { A11yViewProps } from '../../types/A11yView.types';

export const A11yView = React.memo<A11yViewProps>(
  ({
    onScreenReaderFocusChange,
    onScreenReaderBlur,
    onScreenReaderFocus,
    ...props
  }) => {
    const hasHandler = Boolean(
      onScreenReaderFocusChange || onScreenReaderBlur || onScreenReaderFocus
    );

    const onScreenReaderChangeHandler = React.useCallback(
      (event: { nativeEvent: { isFocused: boolean } }) => {
        onScreenReaderFocusChange?.(event.nativeEvent.isFocused);
        if (event.nativeEvent.isFocused) {
          onScreenReaderFocus?.();
        } else {
          onScreenReaderBlur?.();
        }
      },
      [onScreenReaderFocusChange, onScreenReaderBlur, onScreenReaderFocus]
    );

    const onScreenReaderHandlerProp = hasHandler
      ? onScreenReaderChangeHandler
      : undefined;

    return (
      <A11yViewNativeComponent
        {...props}
        onScreenReaderFocusChange={onScreenReaderHandlerProp}
      />
    );
  }
);
