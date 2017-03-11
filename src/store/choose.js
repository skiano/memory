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
    const {
      completedSets,
      elapsedTime,
      gameState,
      selected,
      sets,
    } = getState()

    const matchSize = sets.get(0).length

    switch (true) {
      /** Locked */
      case (gameState === STATE_LOCKED):
        break

      /** Already Selected */
      case (selected.includes(cardId)):
        dispatch(removeCard(cardId))
        break

      /** Building Set */
      case (selected.size < matchSize):
        dispatch(selectCard(cardId))
        break

      /** Completed Set */
      case (selected.size === matchSize): {
        dispatch(lockGame())
        // This is where some score helper might go
        // it could look at if there is a match and what has been seen etc
        const match = getMatch(selected, sets)

        if (match) {
          const isWin = (completedSets.size() === sets.size())

          wait(getSuccessDuration(isWin)).then(() => {
            selected.forEach((id) => {
              dispatch(submitMatch(id))
              dispatch(deselectCard(id))
              dispatch(removeCard(id))
            })
            dispatch(unlockGame())
          })
        } else {
          wait(getFailureDuration(elapsedTime)).then(() => {
            selected.forEach((id) => {
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
