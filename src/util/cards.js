import modes from '../modes'
import shuffle from './shuffle'

const DEFAULT_SET_SIZE = 2

/*
 * pass card props and set information
 * to the game modes card generator
 */
export const createCardMaker = (maker, info) => {
  if (!maker) return null
  return props => maker(Object.assign({ props }, info))
}

export const makeCards = (cards, mode, level) => {
  const { title, levels, makeCardFace } = modes[mode]
  const { difficulty, sets, setSize } = levels[level]

  if (sets > cards.size) {
    throw new Error(`
      Levels cannot have more than ${cards.size} sets.
      -> ${title}:${difficulty} requested ${sets} sets
    `)
  }

  /* Get enough card types to make the requisite sets */
  /* convert to js so keys are indexes instead of Set keys */
  const baseCards = cards.slice(-sets).toJS()
  const emptySet = Array(...Array(setSize || DEFAULT_SET_SIZE))

  return shuffle(baseCards.reduce((finalCards, value, setId) => (
    finalCards.concat(emptySet.map((empty, setPosition) => ({
      value,
      makeCardFace: createCardMaker(makeCardFace, {
        value,
        setId,
        baseCards,
        setPosition,
        level: levels[level],
      }),
    })))
  ), []))
}

export function cardsMatch(a, b) {
  if (typeof a === 'string') { return a === b }
  return a.value === b.value
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
