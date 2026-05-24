// Android stub — bypasses the native bridge, uses the built-in API directly.
import { AccessibilityInfo } from 'react-native';

export const ScreenReader = {
  announce: (message: string) => {
    AccessibilityInfo.announceForAccessibility(message);
    return Promise.resolve({ id: '', status: 'fired' as const });
  },
  cancel: () => Promise.resolve({ id: '', status: 'cancelled' as const }),
  cancelAll: () => Promise.resolve({ id: '', status: 'cancelled' as const }),
};

export const announce = (message: string) => {
  AccessibilityInfo.announceForAccessibility(message);
  return Promise.resolve({ id: '', status: 'fired' as const });
};

export const cancel = () =>
  Promise.resolve({ id: '', status: 'cancelled' as const });
export const cancelAll = () =>
  Promise.resolve({ id: '', status: 'cancelled' as const });
