import type { ComponentType } from 'react';
import {
  codegenNativeComponent,
  codegenNativeCommands,
  type ViewProps,
  type CodegenTypes,
  type HostComponent,
} from 'react-native';

export type ScreenReaderFocusChange = Readonly<{
  isFocused: boolean;
}>;

export type ScreenReaderDescendantFocusChanged = Readonly<{
  status: string;
  nativeId?: string;
}>;

export interface A11yIndexNativeComponentProps extends ViewProps {
  orderIndex?: CodegenTypes.Int32;
  orderKey?: string;
  orderFocusType?: CodegenTypes.Int32;
  shouldGroupAccessibilityChildren?: CodegenTypes.Int32;

  descendantFocusChangedEnabled?: boolean;

  onScreenReaderFocused?: CodegenTypes.DirectEventHandler<{}>;
  onScreenReaderDescendantFocusChanged?: CodegenTypes.DirectEventHandler<ScreenReaderDescendantFocusChanged>;
  onScreenReaderFocusChange?: CodegenTypes.DirectEventHandler<ScreenReaderFocusChange>;

  containerType?: CodegenTypes.Int32;
}

export interface NativeCommands {
  // @ts-ignore
  focus: (viewRef: React.ElementRef<ComponentType>) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['focus'],
});

export default codegenNativeComponent<A11yIndexNativeComponentProps>(
  'A11yIndexView'
) as HostComponent<A11yIndexNativeComponentProps>;
