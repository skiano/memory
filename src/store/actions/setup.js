import fetch from 'isomorphic-fetch'

import {
  makeCards,
  makeSets,
} from '../../util'

import {
  setupGame,
  stopTimer,
  resetTimer,
  setupCards,
} from './'

export const setup = (mode, level, cardMaker = makeCards) => (
  (dispatch, getState) => {
    const { cardTypes } = getState()
    const cards = cardMaker(cardTypes, mode, level)

    dispatch(stopTimer())
    dispatch(resetTimer())

    dispatch(setupGame({
      cards,
      sets: makeSets(cards),
      remaining: cards.map((c, i) => i),
      seen: cards.map(() => 0),
    }))
  }
)

export const fetchCards = () => (
  (dispatch) => {
    fetch('/api').then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }

      response.json().then(({ levels }) => {
        /** put two levels together because duplicates will be removed */
        dispatch(setupCards(levels[0].cards.concat(levels[1].cards)))
      })
    })
  }
)
