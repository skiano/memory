
export const makeCards = (cards, gameMode) => {
  // This is where the game will be extendable
  console.log(cards, gameMode)
  return [...cards]
}

export const makeSets = cards => (
  cards.map(c => c)
)

export const pureRemove = (arr, item) => {
  const newArr = [...arr]
  newArr.splice(arr.indexOf(item), 1)
  return newArr
}
