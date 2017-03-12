
// http://stackoverflow.com/a/16267018
export const getGridSize = (cardCount) => {
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

export const getGridLayout = (cardCount) => {
  console.log(cardCount)
  return [4, 4]
}
