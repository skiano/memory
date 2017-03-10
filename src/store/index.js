/** Constants */

export const GAME_STATES = {
  PENDING: 'PENDING',
  STARTED: 'STARTED',
  COMPLETE: 'COMPLETE',
}

/** Action types */

export const START_GAME = 'START_GAME'
export const END_GAME = 'START_GAME'
export const SELECT_CARD = 'SELECT_CARD'
export const DESELECT_CARD = 'DESELECT_CARD'

/** Action creators */

export const startGame = () => ({ type: START_GAME })
export const endGame = () => ({ type: END_GAME })
export const selectCard = id => ({ type: END_GAME, id })

/** State */

export const initialState = {
  gameState: GAME_STATES.PENDING,
  cards: [],
  sets: [],
  selected: [],
  seen: [],
}

/** Reducers */

export const purePush = (state, key, item) => {
  const newState = {}
  newState[key] = [...state[key], item]
  return { ...state, ...newState }
}

export const pureRemove = (state, key, item) => {
  const newState = {}
  newState[key] = [...state[key]].splice(state[key].indexOf(item), 1)
}

export const selection = (state = initialState, action) => {
  switch (action.type) {

    case SELECT_CARD:
      return purePush(state, 'selected', action.id)

    case DESELECT_CARD:
      return pureRemove(state, 'selected', action.id)

    default:
      return state
  }
}

export const memory = (state = initialState, action) => {
  switch (action.type) {

    case SELECT_CARD:
      return purePush(state, 'seen', action.id)

    default:
      return state
  }
}
