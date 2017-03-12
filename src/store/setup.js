import {
  makeCards,
  makeSets,
} from '../util'

import {
  API,
  MODE_STANDARD,
} from './constants'

import {
  setupGame,
  resetTimer,
} from './syncActions'

export const setup = (cards, mode = MODE_STANDARD) => (
  /** Returns a thunk */
  (dispatch) => {
    const createdCards = makeCards(cards, mode)

    dispatch(resetTimer())

    dispatch(setupGame({
      cards: createdCards,
      sets: makeSets(createdCards),
      remaining: createdCards.map((c, i) => i),
      seen: createdCards.map(() => 0),
    }))
  }
)

export const setupFromAPI = (mode = MODE_STANDARD) => {
  console.log(API, mode)
  // get data from api and return sync setup
}
