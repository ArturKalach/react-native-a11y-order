export const CIRCLE_RADIUS = 125;
export const NODE_SIZE = 62;
export const CIRCLE_SIZE = CIRCLE_RADIUS * 2;
export const FOCUS_RING_PAD = 10;
export const WRAPPER_SIZE = CIRCLE_SIZE + NODE_SIZE + FOCUS_RING_PAD * 2;

export const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;
export type Angle = (typeof ANGLES)[number];

export type Formula = 'cos' | 'sin' | 'tg' | 'ctg';
export const FORMULAS: Formula[] = ['cos', 'sin', 'tg', 'ctg'];

const toRad = (deg: number) => (deg * Math.PI) / 180;

const RADIAN_LABELS: Record<number, string> = {
  0: '0',
  45: 'π/4',
  90: 'π/2',
  135: '3π/4',
  180: 'π',
  225: '5π/4',
  270: '3π/2',
  315: '7π/4',
};

const VALUES: Record<number, Record<Formula, string>> = {
  0: { cos: '1', sin: '0', tg: '0', ctg: '∞' },
  45: { cos: '√2/2', sin: '√2/2', tg: '1', ctg: '1' },
  90: { cos: '0', sin: '1', tg: '∞', ctg: '0' },
  135: { cos: '-√2/2', sin: '√2/2', tg: '-1', ctg: '-1' },
  180: { cos: '-1', sin: '0', tg: '0', ctg: '∞' },
  225: { cos: '-√2/2', sin: '-√2/2', tg: '1', ctg: '1' },
  270: { cos: '0', sin: '-1', tg: '∞', ctg: '0' },
  315: { cos: '√2/2', sin: '-√2/2', tg: '-1', ctg: '-1' },
};

export const getRadianLabel = (deg: number): string =>
  RADIAN_LABELS[deg] ?? `${deg}`;

export const getValue = (deg: number, formula: Formula): string =>
  VALUES[deg]?.[formula] ?? '?';

export const getPosition = (angle: number) => {
  const rad = toRad(angle);
  const center = CIRCLE_RADIUS - NODE_SIZE / 2;
  return {
    left: Math.round(center + CIRCLE_RADIUS * Math.cos(rad)),
    top: Math.round(center - CIRCLE_RADIUS * Math.sin(rad)),
  };
};
