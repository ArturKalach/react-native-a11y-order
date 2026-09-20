import {
  codegenNativeComponent,
  type ViewProps,
  type CodegenTypes,
} from 'react-native';

export interface A11yPaneTitleProps extends ViewProps {
  title?: string;
  detachMessage?: string;
  type: CodegenTypes.Int32;
  withFocusRestore?: boolean;
}

export default codegenNativeComponent<A11yPaneTitleProps>('A11yPaneTitle');
