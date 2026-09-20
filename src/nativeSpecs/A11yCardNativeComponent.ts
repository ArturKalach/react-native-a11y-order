import {
  codegenNativeComponent,
  type ViewProps,
  type HostComponent,
} from 'react-native';

export interface A11yCardNativeComponentProps extends ViewProps {}

export default codegenNativeComponent<A11yCardNativeComponentProps>(
  'A11yCardView'
) as HostComponent<A11yCardNativeComponentProps>;
