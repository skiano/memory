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
 * decide how big to make the cards and gutter
 */
export function getSizes(
  outerSide,
  cardCount,
  idealGutter,
  minCardSize
) {
  let cardSize

  cardSize = (outerSide - ((cardCount - 1) * idealGutter)) / cardCount

  if (cardSize < minCardSize) { cardSize = minCardSize }

  const gutterSize = (outerSide - (cardCount * cardSize)) / (cardCount - 1)

  return { cardSize, gutterSize }
}

/*
 * calculate the pixel dimensions of the card grid
 */
export function getPxDimensions(dimensions, cardSize, gutterSize) {
  return dimensions.map(d => (
    ((d - 1) * gutterSize) + (d * cardSize)
  ))
}

/*
 * get the absolute position of the card along one dimension
 */
export function getPosition(i, cardSize, gutterSize) {
  return i === 0 ? 0 : (i * cardSize) + (i * gutterSize)
}

/*
 * get a list of positions
 * based on card count and total table size
 */
export function getLayout(
  cardCount,
  tableSize,
  idealGutter = IDEAL_GUTTER,
  minCardSize = MIN_CARD_SIZE
) {
  const shortSide = tableSize[0] < tableSize[1] ? tableSize[0] : tableSize[1]
  const grid = getGridSize(cardCount)
  const { cardSize, gutterSize } = getSizes(shortSide, grid[0], idealGutter, minCardSize)
  const pxDimensions = getPxDimensions(grid, cardSize, gutterSize)
  const offsets = pxDimensions.map((s, i) => (tableSize[i] - s) / 2)
  const positions = []

  let i
  for (i = 0; i < cardCount; i += 1) {
    const x = i % grid[0]
    const y = Math.floor(i / grid[0])
    positions.push([
      getPosition(x, cardSize, gutterSize) + offsets[0],
      getPosition(y, cardSize, gutterSize) + offsets[1],
    ])
  }

  return positions
}

