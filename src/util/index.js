/* eslint-disable no-unused-vars */

// This is where the game will be extendable
export const makeCards = (cards, gameMode) => cards

function cardsMatch(a, b) {
  return a === b
}

export const makeSets = cards => (
  cards.reduce((sets, card, idx) => {
    for (let i = 0; i < sets.length; i += 1) {
      const set = sets[i]
      if (cardsMatch(cards[set[0]], card)) {
        set.push(idx)
        return sets
      }
    }

    sets.push([idx])
    return sets
  }, [])
)
