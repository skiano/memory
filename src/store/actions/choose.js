import {
  LOCKED,
  STARTED,
} from '../constants'

import {
  selectCard,
  deselectCard,
  removeCard,
  submitMatch,
  startGame,
  completeGame,
  lockGame,
  unlockGame,
  startTimer,
  stopTimer,
} from './'

import {
  getSuccessDuration,
  getFailureDuration,
  getPotentialSet,
  isFinalSet,
  wait,
} from '../../util'

/*
 * Every time a card is added
 * to the selection we dispatch a guess
 */
export const guess = () => (
  (dispatch, getState) => {
    const state = getState()
    const sets = state.get('sets')
    const selected = state.get('selected')
    const elapsedTime = state.get('elapsedTime')
    const completedSets = state.get('completedSets')
    const potentialSetId = getPotentialSet(selected, sets)

    /*
     * If:
     * the selection still matches one of the sets
     * we have a good guess
     *
     * Else:
     * we have a bad guess
     * and we need to turn the cards back over
     */
    if (potentialSetId !== null) {
      /* we're on the right track but need to find more matches */
      if (selected.size < sets.get(potentialSetId).length) return

      dispatch(lockGame())

      /** the end of the game */
      const isVictory = isFinalSet(completedSets, sets)
      if (isVictory) {
        dispatch(stopTimer())
        dispatch(completeGame())
      }

      wait(getSuccessDuration(isVictory)).then(() => {
        dispatch(submitMatch(potentialSetId))

        selected.forEach((id) => {
          dispatch(deselectCard(id))
          dispatch(removeCard(id))
        })
        dispatch(unlockGame())
      })
    } else {
      /* Our selection doesn't match any sets */
      dispatch(lockGame())

      wait(getFailureDuration(elapsedTime)).then(() => {
        selected.forEach(id => dispatch(deselectCard(id)))
        dispatch(unlockGame())
      })
    }
  }
)


/*
 * This actionCreator is used
 * whenever a user clicks a card.
 * It simplifies the components
 * because there is only one action
 * to dispatch when the user
 * clicks a card
 */
export const choose = cardId => (
  (dispatch, getState) => {
    const state = getState()
    const sets = state.get('sets')
    const selected = state.get('selected')
    const gameLocked = state.get('gameLocked')
    const matchSize = sets.get(0).length

    switch (true) {
      /** Noop if game is locked */
      case (gameLocked === LOCKED):
        break

      /** Turn card back over */
      case (selected.includes(cardId)):
        dispatch(deselectCard(cardId))
        break

      /** Select a card */
      case (selected.size < matchSize): {
        /** the start of the game */
        if (state.get('gameState') !== STARTED) {
          dispatch(startGame())
          dispatch(startTimer())
        }
        dispatch(selectCard(cardId))
        dispatch(guess())
        break
      }

      default:
        throw new Error(`Selection overflow: \n${selected}`)
    }
  }
)
