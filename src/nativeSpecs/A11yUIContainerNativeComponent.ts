import type { ViewProps } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
// eslint-disable-next-line @react-native/no-deep-imports
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface A11yUIContainerNativeComponentProps extends ViewProps {
  containerType?: Int32;
}

export default codegenNativeComponent<A11yUIContainerNativeComponentProps>(
  'A11yUIContainer'
);
