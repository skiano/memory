
export const makeCards = (cards, gameMode) => {
  // This is where the game will be extendable
  console.log(gameMode)
  return [...cards]
}

export const pureRemove = (arr, item) => {
  const newArr = [...arr]
  newArr.splice(arr.indexOf(item), 1)
  return newArr
}
