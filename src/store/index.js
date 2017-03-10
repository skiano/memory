import { createStore } from 'redux'
import { pureRemove, makeCards, makeSets } from '../util'

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

const initialState = { cards: [], sets: [], remaining: [] }
export const game = (state = initialState, { type, payload, gameMode }) => {
  switch (type) {
    case SETUP_GAME: {
      const cards = makeCards(payload, gameMode)
      const remaining = cards.map((v, i) => i)
      const sets = makeSets(cards)
      return { cards, sets, remaining }
    }

    case REMOVE_CARD:
      return Object.assign(
        {}, state, { remaining: pureRemove(state.remaining, payload) })

    default:
      return state
  }
}

export const selected = (state = [], { type, payload }) => {
  switch (type) {

    case SELECT_CARD:
      return state.includes(payload) ? state : [...state, payload]

    case DESELECT_CARD:
      return state.includes(payload) ? pureRemove(state, payload) : state

    default:
      return state
  }
}

export const seen = (state = [], { type, payload }) => {
  switch (type) {

    case SELECT_CARD:
      return [...state, payload]

    default:
      return state
  }
}

export const memoryApp = (state = {}, action) => (Object.assign({
  gameState: gameState(state.gameState, action),
  selected: selected(state.selected, action),
  seen: seen(state.seen, action),
}, game(state.cards, action)))

export default () => createStore(memoryApp)
