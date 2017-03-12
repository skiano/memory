/* eslint-disable no-unused-vars */

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

export function isFirstChoice(state) {
  return state.get('seen').size === 0
}

export function isFinalSet(completedSets, sets) {
  return completedSets.size === sets.size - 1
}
