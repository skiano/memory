export const TOTAL_POINTS = 20;

export const getPoints = seenCounts => (
  seenCounts.reduce((total, count) => {
    if (count <= 2) return total + TOTAL_POINTS;
    const points = TOTAL_POINTS - (2 * (count - 2));
    return points > 0 ? points : 0;
  }, 0)
);
