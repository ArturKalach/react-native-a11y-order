import { A11yIndex } from '../A11yIndex/A11yIndex';

/**
 * Standalone focus-tracking view with no ordering context.
 * Use when you need screen reader focus events but no position in a sequence.
 * For ordered elements, use {@link A11yIndex} inside an Order container.
 */
export const A11yView = A11yIndex;
