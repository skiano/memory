/* eslint-disable no-unused-vars */

import {
  lockGame,
  unlockGame,
} from '../store/syncActions'

/*
 * This is where the game will be extendable
 */
export const makeCards = (cards, gameMode) => cards

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

export function getSuccessDuration(isFinal) {
  return isFinal ? 600 : 300
}

export function getFailureDuration(elapsedTime) {
  /*
   * This will relate dwell time to time played
   * so that we can turn up the pressure over time.
   *
   * Perhaps the dwellTime also comes from the store
   * so it can be configured in UI?
   */
  return 500
}

export function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export function getMatch(selected, sets) {
  const guess = selected.sort().join()

  for (let i = 0; i < sets.size; i += 1) {
    if (sets.get(i).join() === guess) {
      return i
    }
  }

  return null
}
