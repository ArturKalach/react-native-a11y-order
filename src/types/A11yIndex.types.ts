import { ViewProps } from 'react-native';

export type IndexCommands = { focus: () => void };

export type A11yIndexProps = {
  children: React.ReactNode;
  index: number;
} & ViewProps;
