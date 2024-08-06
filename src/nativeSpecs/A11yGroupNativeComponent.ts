import type { ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface A11yGroupNativeComponentProps extends ViewProps {}

export default codegenNativeComponent<A11yGroupNativeComponentProps>(
  'A11yGroupView'
);
