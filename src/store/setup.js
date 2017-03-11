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
} from './syncActions'

export const setup = (cards, mode = MODE_STANDARD) => (
  /** Returns a thunk */
  (dispatch) => {
    const createdCards = makeCards(cards, mode)

    dispatch(setupGame({
      cards: createdCards,
      sets: makeSets(createdCards),
      remaining: createdCards.map((c, i) => i),
    }))
  }
)

export const setupFromAPI = (mode = MODE_STANDARD) => {
  console.log(API, mode)
  // get data from api and return sync setup
}
