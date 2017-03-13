/* eslint-disable no-unused-vars */
import modes from '../modes'
import shuffle from './shuffle'

const DEFAULT_SET_SIZE = 2

/** if game mode doesn't have a card factory */
export const defaultCardFactory = (value, setMember) => (
  { text: value }
)

/** This is where the game will be extendable */
export const makeCards = (cards, mode, level) => {
  const { title, levels, makeCard } = modes[mode]
  const { difficulty, sets, setSize } = levels[level]
  const cardFactory = makeCard || defaultCardFactory

  if (sets > cards.size) {
    throw new Error(`
      Levels cannot have more than ${cards.size} sets.
      -> ${title}:${difficulty} requested ${sets} sets
    `)
  }

  /* Get enough card types to make the requisite sets */
  const baseCards = cards.slice(-sets)
  const emptySet = Array(...Array(setSize || DEFAULT_SET_SIZE))

  return shuffle(baseCards.reduce((finalCards, value) => (
    finalCards.concat(emptySet.map((empty, i) => ({
      value,
      props: cardFactory(value, i),
    })))
  ), []))
}

/** Once there are more card modes this will be useful */
export function cardsMatch(a, b) {
  if (typeof a === 'string') {
    return a === b
  } else {
    return a.value === b.value  
  }
}

export function vallidateSets(sets, cards) {
  const size = sets[0].length

  sets.forEach((set) => {
    if (set.length !== size) {
      throw new Error(`Sets must be the same size: ${JSON.stringify(cards)}`)
    }
  })

  return sets
}

export function makeSets(cards) {
  return vallidateSets(cards.reduce((sets, card, idx) => {
    for (let i = 0; i < sets.length; i += 1) {
      const set = sets[i]
      if (cardsMatch(cards[set[0]], card)) {
        set.push(idx)
        return sets
      }
    }

    sets.push([idx])
    return sets
  }, []), cards)
}
