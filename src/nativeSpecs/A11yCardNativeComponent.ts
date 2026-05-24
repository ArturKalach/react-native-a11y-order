import { codegenNativeComponent, type ViewProps } from 'react-native';

export interface A11yCardNativeComponentProps extends ViewProps {}

export default codegenNativeComponent<A11yCardNativeComponentProps>(
  'A11yCardView'
);
