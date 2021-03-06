import { createAction } from 'redux-actions';

/** Action types */
export const SET_CONFIG = 'SET_CONFIG';
export const CREATE_GAME = 'CREATE_GAME';
export const START_GAME = 'START_GAME';
export const COMPLETE_GAME = 'COMPLETE_GAME';
export const LOCK_GAME = 'LOCK_GAME';
export const UNLOCK_GAME = 'UNLOCK_GAME';
export const SELECT_CARD = 'SELECT_CARD';
export const DESELECT_CARD = 'DESELECT_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const SUBMIT_MATCH = 'SUBMIT_MATCH';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESET_TIMER = 'RESET_TIMER';
export const TICK = 'TICK';

/** Action creators */
export const setConfig = createAction(SET_CONFIG);
export const createGame = createAction(CREATE_GAME);
export const startGame = createAction(START_GAME);
export const completeGame = createAction(COMPLETE_GAME);
export const lockGame = createAction(LOCK_GAME);
export const unlockGame = createAction(UNLOCK_GAME);
export const selectCard = createAction(SELECT_CARD);
export const deselectCard = createAction(DESELECT_CARD);
export const removeCard = createAction(REMOVE_CARD);
export const submitMatch = createAction(SUBMIT_MATCH);
export const updateScore = createAction(UPDATE_SCORE);
export const resetTimer = createAction(RESET_TIMER);
export const tick = createAction(TICK);

/** Export complex actions */
export { setup, setupModes, setupGame } from './setup';
export { startTimer, stopTimer } from './timer';
export { choose } from './choose';
