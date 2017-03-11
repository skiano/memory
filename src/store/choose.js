import {
  GAME_STATES,
  selectCard,
  deselectCard,
  removeCard,
} from './'

/** how long to show a successful match */
const showMatchTime = 300

const getDwellTime = (elapsedTime) => {
  /*
   * This will relate dwell time to time played
   * so that we can turn up the pressure over time.
   *
   * Perhaps the dwellTime also comes from the store
   * so it can be configured in UI?
   */
  console.log(elapsedTime)
  return 500
}

const lockFor = (time, dispatch) => (
  new Promise((resolve) => {
    dispatch(/* lockGame */)
    setTimeout(() => {
      dispatch(/* unlockGame */)
      resolve()
    }, time)
  })
)

const hasMatch = (selected, sets) => {
  console.log(selected, sets)
  return false
}

/*
 * This async actionCreator is used
 * whenever a user clicks a card.
 * It handles all the timing/logic complexity
 */
export default function choose(cardId) {
  /** Returns a thunk */
  return (dispatch, getState) => {
    const { selected, gameState, sets } = getState()
    const setSize = sets.get(0).length
    const dwellTime = getDwellTime(/* pass timer state */)

    switch (true) {
      /** Locked */
      case (gameState === GAME_STATES.LOCKED):
        break

      /** Already Selected */
      case (selected.includes(cardId)):
        dispatch(removeCard(cardId))
        break

      /** Building Set */
      case (selected.size < setSize):
        dispatch(selectCard(cardId))
        break

      /** Completed Set */
      case (selected.size === setSize):

        // This is where some score helper might go
        // it could look at if there is a match and what has been seen etc

        if (hasMatch(selected, sets)) {
          lockFor(showMatchTime, dispatch)
            .then(() => {
              selected.forEach((id) => {
                // dispatch(submitMatch(id))
                dispatch(deselectCard(id))
                dispatch(removeCard(id))
              })
            })
        } else {
          lockFor(dwellTime, dispatch)
            .then(() => {
              selected.forEach((id) => {
                dispatch(deselectCard(id))
              })
            })
        }
        break

      default:
        throw new Error('Unhandled state')
    }
  }
}
