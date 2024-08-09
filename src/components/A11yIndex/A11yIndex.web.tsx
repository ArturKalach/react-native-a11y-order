import React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { IndexCommands, A11yIndexProps } from '../../types/A11yIndex.types';
import { UIManager } from 'react-native';
import { View } from 'react-native';

const WebUiMeneger = UIManager as unknown as {
  focus: (v: View) => void;
};

export const A11yIndex = forwardRef<IndexCommands, A11yIndexProps>(
  (props, ref) => {
    const viewRef = useRef<View>(null);
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (viewRef.current) {
          WebUiMeneger.focus(viewRef.current);
        }
      },
    }));

    return <View {...props} ref={viewRef} />;
  }
);
