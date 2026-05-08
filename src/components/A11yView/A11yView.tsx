import React from 'react';
import { A11yIndex } from '../A11yIndex/A11yIndex';
import type { IndexCommands } from '../../types/A11yIndex.types';
import type { A11yViewProps } from '../../types/A11yView.types';

/**
 * Standalone focus-tracking view with no ordering context.
 * Use when you need screen reader focus events but no position in a sequence.
 * For ordered elements, use {@link A11yIndex} inside an Order container.
 */
export const A11yView = React.forwardRef<IndexCommands, A11yViewProps>(
  (props, ref) => <A11yIndex {...props} ref={ref} />
);
