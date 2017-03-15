/* eslint-disable no-unused-vars */

/*
 * How long we see the cards when
 * we find a correct match
 */
export function getSuccessDuration(isFinal) {
  return isFinal ? 1000 : 800;
}

/*
 * How long we see the cards when
 * we guess wrong
 */
export function getFailureDuration(elapsedTime) {
  /** This can relate to the elapsed time */
  return 800;
}

/*
 * Get the set that contains everything
 * in our current selection
 * (return null if there is none)
 */
export function getPotentialSet(selected, sets) {
  const guess = [...selected];
  const base = guess.pop();
  let setId = null;

  /** find the set the base belongs to */
  for (let i = 0; i < sets.length; i += 1) {
    if (sets[i].includes(base)) {
      setId = i;
      break;
    }
  }

  /* every selected card should exist in some set */
  if (setId === null) {
    throw new Error('selected includes values that are not in sets');
  }

  /** ensure the rest of the selection matches */
  return guess.reduce((current, cardId) => {
    if (!sets[setId].includes(cardId)) return false;
    return current;
  }, true) ? setId : null;
}

/*
 * Is this match the winning one?
 */
export function isFinalSet(completedSets, sets) {
  return completedSets.length === sets.length - 1;
}

/*
 * assemble the state of a given card
 */
export function getCardPropsFromState(cardId, state) {
  const { selected, remaining } = state;
  const card = state.cards[cardId];

  return Object.assign({
    idx: cardId,
    isSelected: selected.includes(cardId),
    isRemaining: remaining.includes(cardId),
    makeCardFace: card.makeCardFace,
  }, card);
}
