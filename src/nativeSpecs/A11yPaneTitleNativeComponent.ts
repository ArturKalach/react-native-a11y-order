import type { ViewProps } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
// eslint-disable-next-line @react-native/no-deep-imports
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface A11yPaneTitleProps extends ViewProps {
  title?: string;
  detachMessage?: string;
  type: Int32;
  withFocusRestore?: boolean;
}

export default codegenNativeComponent<A11yPaneTitleProps>('A11yPaneTitle');
