/* eslint-disable no-unused-vars */
import modes from '../modes'
import shuffle from './shuffle'

/** This is where the game will be extendable */
export const makeCards = (cards, mode, level) => {
  const { title, levels } = modes[mode]
  const { difficulty, sets } = levels[level]
  const setSize = levels[level].setSize || 2

  /* We are limited by the card types in the api */
  /* Nothing prevents adding more types */
  const maxSets = cards.get('hard').size

  if (sets > maxSets) {
    throw new Error(`
      Levels cannot have more than ${maxSets} sets.
      -> ${title}:${difficulty} requested ${sets} sets
    `)
  }

  /* Make sure easy matches original NYT sample api */
  const cartTypes = sets <= 4 ?
    cards.get('easy') :
    cards.get('hard')

  /* Get enough card types to make the requisite sets */
  const baseCards = cartTypes.slice(-sets)

  console.log(`
    mode: ${title}
    difficulty: ${difficulty}
    level: ${level}
    baseCards: ${baseCards}
    sets: ${sets}
  `)

  return shuffle([...cartTypes, ...cartTypes])
}

/** Once there are more card modes this will be useful */
export function cardsMatch(a, b) {
  return a === b
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
