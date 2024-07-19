import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

export interface A11yIndexNativeComponentProps extends ViewProps {
  orderIndex: Int32;
  orderKey: string;
}

export default codegenNativeComponent<A11yIndexNativeComponentProps>(
  'A11yIndexView'
);
