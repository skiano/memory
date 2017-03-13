/* eslint-disable no-unused-vars */

/*
 * How long we see the cards when
 * we find a correct match
 */
export function getSuccessDuration(isFinal) {
  return isFinal ? 1000 : 800
}

/*
 * How long we see the cards when
 * we guess wrong
 */
export function getFailureDuration(elapsedTime) {
  /** This can relate to the elapsed time */
  return 800
}

/*
 * Get the set that contains everything
 * in our current selection
 * (return null if there is none)
 */
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

/*
 * Is this match the winning one?
 */
export function isFinalSet(completedSets, sets) {
  return completedSets.size === sets.size - 1
}

/*
 * assemble the state of a given card
 */
export function getCardPropsFromState(cardId, state) {
  const card = state.get('cards').get(cardId)
  const selected = state.get('selected')
  const remaining = state.get('remaining')

  return Object.assign({
    idx: cardId,
    value: card.value,
    isSelected: selected.includes(cardId),
    isRemaining: remaining.includes(cardId),
  }, card.props)
}
