import { List, Set, Map } from 'immutable'

import {
  STATE_UNLOCKED,
  STATE_LOCKED,
  STATE_PENDING,
  STATE_STARTED,
  STATE_COMPLETED,
} from './constants'

import {
  SETUP_GAME,
  START_GAME,
  COMPLETE_GAME,
  LOCK_GAME,
  UNLOCK_GAME,
  REMOVE_CARD,
  SELECT_CARD,
  DESELECT_CARD,
  SUBMIT_MATCH,
  RESET_TIMER,
  TICK,
} from './actions'

const reducers = {}

/** is the game started or completed */
reducers.gameState = (state = STATE_PENDING, { type }) => {
  switch (type) {
    case START_GAME:
      return STATE_STARTED
    case COMPLETE_GAME:
      return STATE_COMPLETED
    default:
      return state
  }
}

/** is the game locked or unlocked */
reducers.gameLocked = (state = STATE_UNLOCKED, { type }) => {
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

/** the list of cards we have */
reducers.cards = (state = List(), { type, payload }) => {
  switch (type) {
    case SETUP_GAME:
      return List().concat(payload.cards)
    default:
      return state
  }
}

/** the list of sets we are searching for */
reducers.sets = (state = List(), { type, payload }) => {
  switch (type) {
    case SETUP_GAME:
      return List().concat(payload.sets)
    default:
      return state
  }
}

/** the list of card ids still on the table */
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

/** keeps track of how many times we saw each card */
reducers.seen = (state = List(), { type, payload }) => {
  switch (type) {
    case SETUP_GAME:
      return List().concat(payload.seen)
    case SELECT_CARD:
      return state.update(payload, v => v + 1)
    default:
      return state
  }
}

/** list of card ids that are face up */
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

/** list of set ids we have completed */
reducers.completedSets = (state = Set(), { type, payload }) => {
  switch (type) {
    case SUBMIT_MATCH:
      return state.add(payload)
    default:
      return state
  }
}

/* time elapsed since first card turned over */
reducers.elapsedTime = (state = 0, { type }) => {
  switch (type) {
    case RESET_TIMER:
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
