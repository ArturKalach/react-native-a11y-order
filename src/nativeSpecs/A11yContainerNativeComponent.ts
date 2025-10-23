import type { ViewProps } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface A11yContainerNativeComponentProps extends ViewProps {
  containerType?: Int32;
}

export default codegenNativeComponent<A11yContainerNativeComponentProps>(
  'A11yContainerView'
);
