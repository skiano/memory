import {
  STATE_LOCKED,
} from './constants'

import {
  selectCard,
  deselectCard,
  removeCard,
  submitMatch,
  lockGame,
  unlockGame,
} from './syncActions'

import {
  getSuccessDuration,
  getFailureDuration,
  getMatch,
  wait,
} from '../util'

/*
 * This async actionCreator is used
 * whenever a user clicks a card.
 * It handles all the timing & logic complexity
 */
export default cardId => (
  (dispatch, getState) => {
    const state = getState()
    const completedSets = state.get('completedSets')
    const elapsedTime = state.get('elapsedTime')
    const gameState = state.get('gameState')
    const selected = state.get('selected')
    const sets = state.get('sets')

    const matchSize = sets.get(0).length

    switch (true) {
      /** Noop if game is locked */
      case (gameState === STATE_LOCKED):
        break

      /** Turn card back over */
      case (selected.includes(cardId)):
        dispatch(deselectCard(cardId))
        break

      /** Building selection */
      case (selected.size < matchSize - 1):
        dispatch(selectCard(cardId))
        break

      /** Submit a guess */
      case (selected.size === matchSize - 1): {
        dispatch(selectCard(cardId))
        dispatch(lockGame())

        // This is where some score helper might go
        // it could look at if there is a match and what has been seen etc

        const finalSelection = getState().get('selected')
        const match = getMatch(finalSelection, sets)

        if (match) {
          const isWin = (completedSets.size() === sets.size())

          wait(getSuccessDuration(isWin)).then(() => {
            finalSelection.forEach((id) => {
              dispatch(submitMatch(id))
              dispatch(deselectCard(id))
              dispatch(removeCard(id))
            })
            dispatch(unlockGame())
          })
        } else {
          wait(getFailureDuration(elapsedTime)).then(() => {
            finalSelection.forEach((id) => {
              dispatch(deselectCard(id))
            })
            dispatch(unlockGame())
          })
        }
        break
      }

      default:
        throw new Error('Unhandled state')
    }
  }
)
