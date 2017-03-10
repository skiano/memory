import { createStore } from 'redux'
import { List, Set, Map } from 'immutable'

import { makeCards, makeSets } from '../util'

/** Constants */

export const GAME_STATES = {
  PENDING: 'PENDING',
  STARTED: 'STARTED',
  COMPLETE: 'COMPLETE',
}

export const GAME_MODES = {
  STANDARD: 'STANDARD',
}

/** Action types */

export const SETUP_GAME = 'SETUP_GAME'
export const START_GAME = 'START_GAME'
export const END_GAME = 'START_GAME'
export const SELECT_CARD = 'SELECT_CARD'
export const DESELECT_CARD = 'DESELECT_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'

/** Action creators */

export const setupGame = (cards, gameMode = GAME_MODES.STANDARD) => ({
  type: SETUP_GAME,
  payload: cards,
  gameMode,
})

export const startGame = () => ({ type: START_GAME })
export const endGame = () => ({ type: END_GAME })
export const selectCard = id => ({ type: SELECT_CARD, payload: id })
export const deselectCard = id => ({ type: DESELECT_CARD, payload: id })
export const removeCard = id => ({ type: REMOVE_CARD, payload: id })

/** Reducers */

export const gameState = (state = GAME_STATES.PENDING, { type }) => {
  switch (type) {
    case START_GAME:
      return GAME_STATES.STARTED

    case END_GAME:
      return GAME_STATES.COMPLETE

    default:
      return state
  }
}

export const game = (state = Map(), { type, payload, gameMode }) => {
  switch (type) {
    case SETUP_GAME: {
      const cards = makeCards(payload, gameMode)
      return state
        .set('cards', List(cards))
        .set('sets', List(makeSets(cards)))
        .set('remaining', List(cards.map((v, i) => i)))
    }

    case REMOVE_CARD: {
      const remaining = state.get('remaining')
      return state.set('remaining', remaining.delete(remaining.indexOf(payload)))
    }

    default:
      return state
  }
}

export const selected = (state = Set(), { type, payload }) => {
  switch (type) {
    case SELECT_CARD:
      return state.add(payload)
    case DESELECT_CARD:
      return state.remove(payload)
    default:
      return state
  }
}

export const seen = (state = Set(), { type, payload }) => {
  switch (type) {
    case SELECT_CARD:
      return state.add(payload)
    default:
      return state
  }
}

const initialState = Map({
  cards: List(),
  sets: List(),
  remaining: Set(),
})
export const memoryApp = (state = initialState, action) => (
  game(state, action)
    .set('gameState', gameState(state.get('gameState'), action))
    .set('selected', selected(state.get('selected'), action))
    .set('seen', seen(state.get('seen'), action))
)

export default () => createStore(memoryApp)
