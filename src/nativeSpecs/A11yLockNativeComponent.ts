import {
  codegenNativeComponent,
  type ViewProps,
  type CodegenTypes,
} from 'react-native';

export interface A11yLockNativeComponentProps extends ViewProps {
  componentType: CodegenTypes.Int32;
  containerKey?: string;
  lockDisabled?: boolean;
  forceLock?: boolean;
}

export default codegenNativeComponent<A11yLockNativeComponentProps>('A11yLock');
