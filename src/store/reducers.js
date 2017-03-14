import { combineReducers } from 'redux';

import {
  remove,
  update,
  addUnique,
} from '../util';

import {
  UNLOCKED,
  LOCKED,
  PENDING,
  STARTED,
  COMPLETED,
} from './constants';

import {
  SET_CONFIG,
  CREATE_GAME,
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
} from './actions';

const reducers = {};

reducers.config = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_CONFIG:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};

/** is the game started or completed */
reducers.gameState = (state = PENDING, { type }) => {
  switch (type) {
    case CREATE_GAME:
      return PENDING;
    case START_GAME:
      return STARTED;
    case COMPLETE_GAME:
      return COMPLETED;
    default:
      return state;
  }
};

/** is the game locked or unlocked */
reducers.gameLocked = (state = UNLOCKED, { type }) => {
  switch (type) {
    case CREATE_GAME:
      return UNLOCKED;
    case LOCK_GAME:
      return LOCKED;
    case UNLOCK_GAME:
      return UNLOCKED;
    default:
      return state;
  }
};

/** the list of cards we have */
reducers.cards = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_GAME:
      return payload.cards;
    default:
      return state;
  }
};

/** the list of sets we are searching for */
reducers.sets = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_GAME:
      return payload.sets;
    default:
      return state;
  }
};

/** the list of card ids still on the table */
reducers.remaining = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_GAME:
      return payload.remaining;
    case REMOVE_CARD:
      return remove(state, payload);
    default:
      return state;
  }
};

/** keeps track of how many times we saw each card */
reducers.seen = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_GAME:
      return payload.seen;
    case SELECT_CARD:
      return update(state, payload, v => v + 1);
    default:
      return state;
  }
};

/** list of card ids that are face up */
reducers.selected = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_GAME:
      return [];
    case SELECT_CARD:
      return addUnique(state, payload);
    case DESELECT_CARD:
      return remove(state, payload);
    default:
      return state;
  }
};

/** list of set ids we have completed */
reducers.completedSets = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_GAME:
      return [];
    case SUBMIT_MATCH:
      return addUnique(state, payload);
    default:
      return state;
  }
};

/* time elapsed since first card turned over */
reducers.elapsedTime = (state = 0, { type }) => {
  switch (type) {
    case RESET_TIMER:
      return 0;
    case TICK:
      return state + 1;
    default:
      return state;
  }
};

export default combineReducers(reducers);
