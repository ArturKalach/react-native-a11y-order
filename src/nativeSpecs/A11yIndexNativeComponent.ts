import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';
import type {
  DirectEventHandler,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
// eslint-disable-next-line @react-native/no-deep-imports
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
// eslint-disable-next-line @react-native/no-deep-imports
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

export type ScreenReaderFocusChange = Readonly<{
  isFocused: boolean;
}>;

export type ScreenReaderDescendantFocusChanged = Readonly<{
  status: string;
}>;

export interface A11yIndexNativeComponentProps extends ViewProps {
  orderIndex: Int32;
  orderKey: string;
  orderFocusType: Int32;

  onScreenReaderFocusChange?: DirectEventHandler<ScreenReaderFocusChange>;
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
);
