import { View } from 'react-native';
import { A11yIndex } from './components/A11yIndex/A11yIndex.web';

export type { IndexCommands } from './types/A11yIndex.types';

export const A11y = {
  Order: View,
  Group: View,
  Index: A11yIndex,
  Container: View,
};
