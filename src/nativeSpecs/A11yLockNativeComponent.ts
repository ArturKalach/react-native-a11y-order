import type { ViewProps } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
// eslint-disable-next-line @react-native/no-deep-imports
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface A11yLockNativeComponentProps extends ViewProps {
  componentType: Int32;
  containerKey?: string;
  lockDisabled?: boolean;
}

export default codegenNativeComponent<A11yLockNativeComponentProps>('A11yLock');
