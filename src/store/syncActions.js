import { createAction } from 'redux-actions'

/** Action types */

export const SETUP_GAME = 'SETUP_GAME'
export const LOCK_GAME = 'LOCK_GAME'
export const UNLOCK_GAME = 'UNLOCK_GAME'
export const SELECT_CARD = 'SELECT_CARD'
export const DESELECT_CARD = 'DESELECT_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'

/** Action creators */

export const lockGame = createAction(LOCK_GAME)
export const unlockGame = createAction(UNLOCK_GAME)
export const selectCard = createAction(SELECT_CARD)
export const deselectCard = createAction(DESELECT_CARD)
export const removeCard = createAction(REMOVE_CARD)
export const setupGame = createAction(SETUP_GAME)
