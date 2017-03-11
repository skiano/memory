import {
  makeCards,
  makeSets,
} from '../util'

import {
  MODE_STANDARD,
} from './constants'

import {
  setupGame,
} from './syncActions'

export const setupFromAPI = (mode = MODE_STANDARD) => {
  console.log(mode)
}

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
