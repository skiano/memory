import { List, Set, Map } from 'immutable'

import {
  STATE_UNLOCKED,
  STATE_LOCKED,
} from './constants'

import {
  SETUP_GAME,
  LOCK_GAME,
  UNLOCK_GAME,
  REMOVE_CARD,
  SELECT_CARD,
  DESELECT_CARD,
} from './syncActions'

const reducers = {}

reducers.cards = (state = List(), { type, payload }) => {
  switch (type) {
    case SETUP_GAME:
      return state.concat(payload.cards)
    default:
      return state
  }
}

reducers.sets = (state = List(), { type, payload }) => {
  switch (type) {
    case SETUP_GAME:
      return state.concat(payload.sets)
    default:
      return state
  }
}

reducers.remaining = (state = Set(), { type, payload }) => {
  switch (type) {
    case SETUP_GAME:
      return state.concat(payload.remaining)

    case REMOVE_CARD:
      return state.remove(payload)

    default:
      return state
  }
}

reducers.selected = (state = Set(), { type, payload }) => {
  switch (type) {
    case SELECT_CARD:
      return state.add(payload)
    case DESELECT_CARD:
      return state.remove(payload)
    default:
      return state
  }
}

reducers.seen = (state = Set(), { type, payload }) => {
  switch (type) {
    case SELECT_CARD:
      return state.add(payload)
    default:
      return state
  }
}

// Handle SUBMIT_SET
reducers.foundSets = (state = Set()) => state

reducers.gameState = (state = STATE_UNLOCKED, { type }) => {
  switch (type) {
    case LOCK_GAME:
      return STATE_LOCKED
    case UNLOCK_GAME:
      return STATE_UNLOCKED
    default:
      return state
  }
}

export default (state = Map(), action) => (
  Object.keys(reducers).reduce((s, key) => (
    s.set(key, reducers[key](s.get(key), action))
  ), state)
)