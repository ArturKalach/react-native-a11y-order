import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';

export interface A11yOrderNativeComponentProps extends ViewProps {
  orderKey: string;
}

export default codegenNativeComponent<A11yOrderNativeComponentProps>(
  'A11yOrderView'
);
