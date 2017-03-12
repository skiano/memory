const MIN_CARD_SIZE = 40
const IDEAL_GUTTER = 20

/*
 * given card count
 * return dimensions closest to square
 */
export function getGridSize(cardCount) {
  // http://stackoverflow.com/a/16267018
  let n
  n = Math.sqrt(cardCount)
  n = Math.floor(n)

  while (n > 0) {
    if (cardCount % n === 0) break
    n -= 1
  }

  if (n === 1) {
    throw new Error(`Bad card count: ${cardCount} (Card count must not be prime)`)
  }

  return [n, cardCount / n].sort().reverse()
}

/*
 * Given a dimension
 * decide how big to make the cards and gutter
 */
export function getSizes(
  outerSide,
  cardCount,
  idealGutter = IDEAL_GUTTER,
  minCardSize = MIN_CARD_SIZE) {
  let cardSize

  cardSize = (outerSide - ((cardCount - 1) * idealGutter)) / cardCount

  if (cardSize < minCardSize) { cardSize = minCardSize }

  const gutterSize = (outerSide - (cardCount * cardSize)) / (cardCount - 1)

  return { cardSize, gutterSize }
}

