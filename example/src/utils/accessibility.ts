import { AccessibilityInfo, findNodeHandle } from 'react-native';
import type { RefObject } from 'react';

export const setAccessibilityFocus = (ref: RefObject<any>) => {
  try {
    const node = findNodeHandle(ref?.current) as number | null;
    if (node == null) {
      return;
    }

    AccessibilityInfo.setAccessibilityFocus(node);
  } catch (e) {}
};
