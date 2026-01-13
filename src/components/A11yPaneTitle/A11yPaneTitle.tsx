import React from 'react';
import { type ViewProps } from 'react-native';
import A11yPaneTitleNative from '../../nativeSpecs/A11yPaneTitleNativeComponent';

enum PaneEnum {
  activity = 0,
  pane = 1,
  announce = 2,
}

type PaneType = keyof typeof PaneEnum;

type A11yPaneTitleType = React.PropsWithChildren<{
  title?: string;
  detachMessage?: string;
  type?: PaneType;
  withFocusRestore?: boolean;
  displayed?: boolean;
}>;

export const A11yPaneTitle = ({
  title,
  detachMessage,
  type = 'pane',
  children,
  displayed,
  withFocusRestore = true,
}: ViewProps & A11yPaneTitleType) => {
  if (displayed === false) return null;

  return (
    <A11yPaneTitleNative
      title={title}
      detachMessage={detachMessage}
      type={PaneEnum[type]}
      children={children}
      withFocusRestore={withFocusRestore}
    />
  );
};

export const A11yScreenChange = (props: Omit<A11yPaneTitleType, 'type'>) => (
  <A11yPaneTitle
    title={props.title}
    detachMessage={props.detachMessage}
    displayed={props.displayed}
    type="activity"
  />
);
