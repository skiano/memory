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
  SUBMIT_MATCH,
  START_TIMER,
  TICK,
} from './syncActions'

const reducers = {}

reducers.gameState = (state = STATE_UNLOCKED, { type }) => {
  switch (type) {
    case SETUP_GAME:
      return STATE_UNLOCKED
    case LOCK_GAME:
      return STATE_LOCKED
    case UNLOCK_GAME:
      return STATE_UNLOCKED
    default:
      return state
  }
}

reducers.cards = (state = List(), { type, payload }) => {
  switch (type) {
    case SETUP_GAME:
      return List().concat(payload.cards)
    default:
      return state
  }
}

reducers.sets = (state = List(), { type, payload }) => {
  switch (type) {
    case SETUP_GAME:
      return List().concat(payload.sets)
    default:
      return state
  }
}

reducers.remaining = (state = Set(), { type, payload }) => {
  switch (type) {
    case SETUP_GAME:
      return Set().concat(payload.remaining)

    case REMOVE_CARD:
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

reducers.completedSets = (state = Set(), { type, payload }) => {
  switch (type) {
    case SUBMIT_MATCH:
      return state.add(payload)
    default:
      return state
  }
}

reducers.elapsedTime = (state = 0, { type }) => {
  switch (type) {
    case START_TIMER:
      return 0
    case TICK:
      return state + 1
    default:
      return state
  }
}

export default (state = Map(), action) => (
  Object.keys(reducers).reduce((s, key) => (
    s.set(key, reducers[key](s.get(key), action))
  ), state)
)
