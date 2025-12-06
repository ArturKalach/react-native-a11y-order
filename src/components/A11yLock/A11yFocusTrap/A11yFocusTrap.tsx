import React from 'react';
import { View } from 'react-native';
import type { A11yLockProps } from '../../../types/A11yLock.types';
import { A11yFocusTrapMountWrapper } from './A11yFocusTrapMountWrapper';

export const A11yFocusTrap = (props: A11yLockProps) => (
  <A11yFocusTrapMountWrapper>
    <View collapsable={false} accessibilityViewIsModal={true} {...props} />
  </A11yFocusTrapMountWrapper>
);
