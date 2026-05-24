import React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { A11yIndexProps } from './A11yIndex.types';
import { UIManager } from 'react-native';
import { View } from 'react-native';

const WebUiManager = UIManager as unknown as {
  focus: (v: View) => void;
};

export const A11yIndex = forwardRef<{}, A11yIndexProps>((props, ref) => {
  const viewRef = useRef<View>(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (viewRef.current) {
        WebUiManager.focus(viewRef.current);
      }
    },
  }));

  return <View {...props} ref={viewRef as any} />;
});
