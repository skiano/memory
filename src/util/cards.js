/* eslint-disable no-unused-vars */
import modes from '../modes'
import shuffle from './shuffle'

/** This is where the game will be extendable */
export const makeCards = (cards, mode, level) => {
  const { title, levels } = modes[mode]
  const { difficulty, sets } = levels[level]
  const setSize = levels[level].setSize || 2

  if (sets > 8) {
    throw new Error(`
      levels cannot have more than 8 setSize
      because there are only 8 cartTypes

      ${title} / ${difficulty} has ${sets} sets
    `)
  }

  const cartTypes = sets <= 4 ?
    cards.get('easy') :
    cards.get('hard')

  console.log(`
    mode: ${title}
    difficulty: ${difficulty}
    level: ${level}
    cartTypes: ${cartTypes}
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
