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

export default function setup(cards, mode = MODE_STANDARD) {
  /** Returns a thunk */
  return (dispatch) => {
    const createdCards = makeCards(cards, mode)

    dispatch(setupGame({
      cards: createdCards,
      sets: makeSets(createdCards),
      remaining: createdCards.map((c, i) => i),
    }))
  }
}
