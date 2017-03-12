/* eslint-disable no-unused-vars */

import {
  lockGame,
  unlockGame,
} from '../store/syncActions'

/** This is where the game will be extendable */
export const makeCards = (cards, gameMode) => cards

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

export function getSuccessDuration(isFinal) {
  return isFinal ? 1000 : 800
}

export function getFailureDuration(elapsedTime) {
  /*
   * This will relate dwell time to time played
   * so that we can turn up the pressure over time.
   *
   * Perhaps the dwellTime also comes from the store
   * so it can be configured in UI?
   */
  return 800
}

export function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })

  // Jest is being weird about time
  // so this is instant for now
  // return {
  //   then: cb => cb(),
  // }
}

export function getPotentialSet(selected, sets) {
  const guess = selected.toJS()
  const base = guess.pop()
  let setId = null

  /** find the set the base belongs to */
  for (let i = 0; i < sets.size; i += 1) {
    if (sets.get(i).includes(base)) {
      setId = i
      break
    }
  }

  /* every selected card should exist in some set */
  if (setId === null) {
    throw new Error('selected includes values that are not in sets')
  }

  /** ensure the rest of the selection matches */
  return guess.reduce((current, cardId) => {
    if (!sets.get(setId).includes(cardId)) return false
    return current
  }, true) ? setId : null
}

export function isFinalSet(completedSets, sets) {
  return completedSets.size === sets.size - 1
}
