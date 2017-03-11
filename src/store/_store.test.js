/* eslint-disable no-unused-vars */

import createStore from './'
import setup from './setup'

import {
  STATE_UNLOCKED,
} from './constants'

import {
  selectCard,
  deselectCard,
  removeCard,
} from './syncActions'

// test('Initial State', () => {
//   const initial = createStore().getState()
//   expect(initial.get('gameState')).toBe(STATE_UNLOCKED)
//   expect(initial.get('cards').size).toBe(0)
//   expect(initial.get('remaining').size).toBe(0)
//   expect(initial.get('sets').size).toBe(0)
//   expect(initial.get('seen').size).toBe(0)
//   expect(initial.get('selected').size).toBe(0)
// })

// test('Setup Game: Ensure set lengths match', () => {
//   const store = createStore()
//   const input = ['A', 'B', 'C', 'A', 'B']

//   expect(() => {
//     store.dispatch(setup(input))
//   }).toThrowError(/Sets must be the same size/)
// })

test('Setup Game: Standard', () => {
  const store = createStore()
  const input = ['A', 'B', 'C', 'A', 'B', 'C']

  store.dispatch(setup(input))

  const state = store.getState()

  const expectedRemaining = [0, 1, 2, 3, 4, 5]
  input.map(c => expect(state.get('cards').includes(c)).toBe(true))
  expectedRemaining.map(i => expect(state.get('remaining').includes(i)).toBe(true))

  const expectedSets = ['0,3', '1,4', '2,5']
  const flattenedSets = state.get('sets').map(set => set.join())
  expectedSets.map(s => expect(flattenedSets.includes(s)).toBe(true))
})

test('selectCard', () => {
  const store = createStore()
  const input = ['A', 'B', 'C']

  store.dispatch(setup(input))
  store.dispatch(selectCard(1))
  store.dispatch(selectCard(2))
  store.dispatch(selectCard(1))

  const selected = store.getState().get('selected')
  const expected = [1, 2]

  expected.forEach(i => expect(selected.includes(i)).toBe(true))
})

test('deselectCard', () => {
  const store = createStore()
  const input = ['A', 'B', 'C']

  store.dispatch(setup(input))
  store.dispatch(selectCard(1))
  store.dispatch(selectCard(2))
  store.dispatch(deselectCard(2))
  store.dispatch(deselectCard(0))

  const selected = store.getState().get('selected')
  const expected = [1]

  expected.forEach(i => expect(selected.includes(i)).toBe(true))
})

test('removeCard', () => {
  const store = createStore()
  const input = ['A', 'B', 'C']

  store.dispatch(setup(input))

  const remainingBefore = store.getState().get('remaining')
  const expectBefore = [0, 1, 2]

  expectBefore.forEach(i => expect(remainingBefore.includes(i)).toBe(true))

  store.dispatch(removeCard(1))

  const remainingAfter = store.getState().get('remaining')
  const expectAfter = [0, 2]

  expectAfter.forEach(i => expect(remainingAfter.includes(i)).toBe(true))
})
