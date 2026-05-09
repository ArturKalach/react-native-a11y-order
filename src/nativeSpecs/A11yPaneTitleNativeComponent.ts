import { codegenNativeComponent, type ViewProps } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

export interface A11yPaneTitleProps extends ViewProps {
  title?: string;
  detachMessage?: string;
  type: Int32;
  withFocusRestore?: boolean;
}

export default codegenNativeComponent<A11yPaneTitleProps>('A11yPaneTitle');
