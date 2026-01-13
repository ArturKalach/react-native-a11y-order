import type {
  A11yUIContainerType,
  A11yUIContainerProps,
} from './A11yUIContainerView.types';

type GroupType = A11yUIContainerType | 'legacy';
export type A11yGroupProps = Omit<A11yUIContainerProps, 'type'> & {
  type?: GroupType;
};
