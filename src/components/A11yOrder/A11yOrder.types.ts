import type { ViewProps } from 'react-native';

/**
 * Props for {@link A11y.Order} — a container that defines an explicit screen reader
 * focus sequence for its `A11y.Index` children.
 *
 * All standard `View` props are accepted and forwarded to the underlying native view.
 * The `orderKey` that links child `A11y.Index` elements to this container is generated
 * internally via `React.useId` and requires no prop.
 */
export type A11yOrderProps = ViewProps;
