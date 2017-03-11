/* eslint-disable no-unused-vars */

import createStore from './'
import { setup } from './setup'

import {
  setupGame,
  lockGame,
  unlockGame,
  selectCard,
  deselectCard,
  removeCard,
  submitMatch,
  startTimer,
  tick,
} from './syncActions'

test('initial state', () => {
  const initial = createStore().getState()
  expect(initial.get('gameState')).toBe('STATE_UNLOCKED')
  expect(initial.get('cards').size).toBe(0)
  expect(initial.get('remaining').size).toBe(0)
  expect(initial.get('sets').size).toBe(0)
  expect(initial.get('completedSets').size).toBe(0)
  expect(initial.get('seen').size).toBe(0)
  expect(initial.get('selected').size).toBe(0)
  expect(initial.get('elapsedTime')).toBe(0)
})

test('action: setup: sit sizes must match', () => {
  const store = createStore()
  const input = ['A', 'B', 'C', 'A', 'B']

  expect(() => {
    store.dispatch(setup(input))
  }).toThrowError(/Sets must be the same size/)
})

test('action: setup: creates {cards, sets, remaining}', () => {
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

test('action: selectCard', () => {
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

test('action: deselectCard', () => {
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

test('action: removeCard', () => {
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

test('action: lockGame', () => {
  const store = createStore()
  store.dispatch(unlockGame())
  store.dispatch(lockGame())
  expect(store.getState().get('gameState')).toEqual('STATE_LOCKED')
})

test('action: unlockGame', () => {
  const store = createStore()
  store.dispatch(lockGame())
  store.dispatch(unlockGame())
  expect(store.getState().get('gameState')).toEqual('STATE_UNLOCKED')
})

test('action: submitMatch', () => {
  const store = createStore()
  store.dispatch(submitMatch(1))
  store.dispatch(submitMatch(3))
  const completed = store.getState().get('completedSets')
  expect(completed.includes(1)).toBe(true)
  expect(completed.includes(3)).toBe(true)
})

test('action: tick', () => {
  const { dispatch, getState } = createStore()
  dispatch(tick())
  expect(getState().get('elapsedTime')).toBe(1)

  dispatch(tick())
  dispatch(tick())
  expect(getState().get('elapsedTime')).toBe(3)
})

test('action: startTimer', () => {
  const { dispatch, getState } = createStore()
  dispatch(tick())
  expect(getState().get('elapsedTime')).toBe(1)
  dispatch(startTimer())
  expect(getState().get('elapsedTime')).toBe(0)
})
