import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
// eslint-disable-next-line @react-native/no-deep-imports
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
// eslint-disable-next-line @react-native/no-deep-imports
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type ScreenReaderFocusChange = Readonly<{
  isFocused: boolean;
}>;

export type ScreenReaderDescendantFocusChanged = Readonly<{
  status: string;
  nativeId?: string;
}>;

export interface A11yViewProps extends ViewProps {
  autoFocus?: boolean;
  descendantFocusChangedEnabled?: boolean;

  onScreenReaderFocused?: DirectEventHandler<{}>;
  onScreenReaderDescendantFocusChanged?: DirectEventHandler<ScreenReaderDescendantFocusChanged>;
  onScreenReaderFocusChange?: DirectEventHandler<ScreenReaderFocusChange>;
}

export interface NativeCommands {
  // @ts-ignore
  focus: (viewRef: React.ElementRef<ComponentType>) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['focus'],
});

export default codegenNativeComponent<A11yViewProps>('A11yView');
