import type { A11yContainerProps } from './A11yContainerView.types';

export type A11yGroupProps = A11yContainerProps & {
  type?: A11yContainerProps['type'] & 'legacy';
};
