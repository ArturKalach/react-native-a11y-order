export const CIRCLE_CENTER = 125 - 25;
export const CIRCLE_RADIUS = 125;

export const getPosition = (angle: number) => {
  const angleRad = ((90 + -1 * angle) * Math.PI) / 180;
  const x = CIRCLE_CENTER + CIRCLE_RADIUS * Math.cos(angleRad) - 5;
  const y = CIRCLE_CENTER + CIRCLE_RADIUS * Math.sin(angleRad) - 5;

  return { x, y };
};
