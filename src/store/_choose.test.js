/* eslint-disable no-unused-vars */

import createStore from './'
import { choose } from './choose'
import { setup } from './setup'

import {
  setupGame,
  lockGame,
  unlockGame,
  selectCard,
  deselectCard,
  removeCard,
  submitMatch,
} from './syncActions'

jest.useFakeTimers()

let getState
let dispatch

beforeEach(() => {
  const store = createStore()
  getState = store.getState
  dispatch = store.dispatch
  dispatch(setup(
    ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C']
  ))
})

test('choose: noop if game is locked', () => {
  dispatch(choose(1))
  dispatch(lockGame())
  dispatch(choose(2))
  expect(getState().get('selected').size).toEqual(1)
})

test('choose: toggles card', () => {
  dispatch(choose(1))
  expect(getState().get('selected').size).toEqual(1)
  dispatch(choose(1))
  expect(getState().get('selected').size).toEqual(0)
})

test('choose: throws on selection overflow', () => {
  dispatch(selectCard(1))
  dispatch(selectCard(2))
  dispatch(selectCard(3))
  dispatch(selectCard(4))
  expect(() => {
    dispatch(choose(5))
  }).toThrowError(/Selection overflow/)
})

test('choose: building a selection', () => {
  dispatch(choose(1))
  dispatch(choose(3))
  expect(getState().get('selected').size).toEqual(2)
})

// test('guess: incorrect', (done) => {
//   dispatch(choose(3))
//   dispatch(choose(4))
//   dispatch(choose(5))

//   jest.runAllTimers()

//   process.nextTick(() => {
//     expect(getState().get('selected').size).toEqual(0)
//     done()
//   })
// })

// test('guess: incorrect: locking', () => {
//   dispatch(choose(3))
//   dispatch(choose(4))
//   dispatch(choose(5))
//   dispatch(choose(1))
//   dispatch(choose(2))

//   expect(getState().get('selected').size).toEqual(3)
// })

// test('guess: correct', () => {
//   expect(true).toBe(false)
// })

// test('guess: correct: locking', () => {
//   expect(true).toBe(false)
// })
