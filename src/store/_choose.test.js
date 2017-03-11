/* eslint-disable no-unused-vars */

import createStore from './'
import { choose } from './choose'

import {
  setupGame,
  lockGame,
  unlockGame,
  selectCard,
  deselectCard,
  removeCard,
  submitMatch,
} from './syncActions'

let getState
let dispatch

beforeEach(() => {
  const store = createStore()
  getState = store.getState
  dispatch = store.dispatch
})

test('choose: noop if game is locked', () => {
  console.log('game is locked')
})

test('choose: deselecting a card', () => {
  console.log('game is locked')
})

test('choose: selecting a card', () => {
  console.log('game is locked')
})
