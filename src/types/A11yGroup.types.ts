import type {
  A11yContainerType,
  A11yContainerProps,
} from './A11yContainerView.types';

type GroupType = A11yContainerType | 'legacy';

export type A11yGroupProps = Omit<A11yContainerProps, 'type'> & {
  type?: GroupType;
};
