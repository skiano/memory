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
  idealGutter,
  minCardSize
) {
  let cardSize

  cardSize = (outerSide - ((cardCount - 1) * idealGutter)) / cardCount

  if (cardSize < minCardSize) {
    cardSize = minCardSize
  }

  const gutterSize = (outerSide - (cardCount * cardSize)) / (cardCount - 1)

  return { cardSize, gutterSize }
}

export function getPxDimensions(dimensions, cardSize, gutterSize) {
  return dimensions.map(d => (
    ((d - 1) * gutterSize) + (d * cardSize)
  ))
}

export function getPosition(i, cardSize, gutterSize) {
  return i === 0 ? 0 : (i * cardSize) + (i * gutterSize)
}

export function getLayout(
  cardCount,
  size,
  idealGutter = IDEAL_GUTTER,
  minCardSize = MIN_CARD_SIZE
) {
  const shortSide = size[0] < size[1] ? size[0] : size[1]
  const { cardSize, gutterSize } = getSizes(shortSide, cardCount, idealGutter, minCardSize)
  const grid = getGridSize(cardCount)
  const pxDimensions = getPxDimensions(grid, cardSize, gutterSize)
  const offsets = pxDimensions.map((s, i) => (size[i] - s) / 2)
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

  return { pxDimensions, positions }
}

