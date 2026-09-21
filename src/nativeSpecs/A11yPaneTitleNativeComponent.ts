import {
  codegenNativeComponent,
  type ViewProps,
  type CodegenTypes,
  type HostComponent,
} from 'react-native';

export interface A11yPaneTitleProps extends ViewProps {
  title?: string;
  detachMessage?: string;
  type: CodegenTypes.Int32;
  withFocusRestore?: boolean;
}

export default codegenNativeComponent<A11yPaneTitleProps>(
  'A11yPaneTitle'
) as HostComponent<A11yPaneTitleProps>;
