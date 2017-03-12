import fetch from 'isomorphic-fetch'

import {
  makeCards,
  makeSets,
} from '../../util'

import {
  API,
  MODE_STANDARD,
} from '../constants'

import {
  setupGame,
  resetTimer,
  setupCards,
} from './'

export const setup = (mode = MODE_STANDARD) => (
  /** Returns a thunk */
  (dispatch, getState) => {
    const cardTypes = getState().get('cardTypes')
    const cards = makeCards(cardTypes, mode)

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
  /** Returns a thunk */
  (dispatch) => {
    fetch(API).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }

      response.json().then(({ levels }) => {
        dispatch(setupCards(levels))
      })
    })
  }
)
