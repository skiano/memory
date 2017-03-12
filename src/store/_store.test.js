/* eslint-disable no-unused-vars */

import createStore from './'

import {
  setup,
  setupGame,
  lockGame,
  unlockGame,
  selectCard,
  deselectCard,
  removeCard,
  submitMatch,
  resetTimer,
  tick,
} from './actions'

let getState
let dispatch

beforeEach(() => {
  const store = createStore()
  getState = store.getState
  dispatch = store.dispatch
})

test('initial state', () => {
  expect(getState().get('gameLocked')).toBe('STATE_UNLOCKED')
  expect(getState().get('cards').size).toBe(0)
  expect(getState().get('remaining').size).toBe(0)
  expect(getState().get('sets').size).toBe(0)
  expect(getState().get('completedSets').size).toBe(0)
  expect(getState().get('seen').size).toBe(0)
  expect(getState().get('selected').size).toBe(0)
  expect(getState().get('elapsedTime')).toBe(0)
})

test('action: setup: creates {cards, sets, remaining, seen}', () => {
  const input = ['A', 'B', 'C', 'A', 'B', 'C']

  dispatch(setup(input))

  const state = getState()

  const expectedRemaining = [0, 1, 2, 3, 4, 5]
  input.map(c => expect(state.get('cards').includes(c)).toBe(true))
  expectedRemaining.map(i => expect(state.get('remaining').includes(i)).toBe(true))

  const expectedSets = ['0,3', '1,4', '2,5']
  const flattenedSets = state.get('sets').map(set => set.join())
  expectedSets.map(s => expect(flattenedSets.includes(s)).toBe(true))

  const seen = state.get('seen')
  expect(seen.size).toEqual(6)
  seen.forEach(counter => expect(counter).toEqual(0))
})

test('action: setup: handles sets larger than 2', () => {
  const input = ['A', 'B', 'A', 'B', 'A', 'B']
  dispatch(setup(input))
  expect(getState().get('sets').size).toEqual(2)
  expect(getState().get('sets').get(0).length).toEqual(3)
})

test('action: setup: sit sizes must match', () => {
  const input = ['A', 'B', 'C', 'A', 'B']

  expect(() => {
    dispatch(setup(input))
  }).toThrowError(/Sets must be the same size/)
})

test('action: selectCard', () => {
  const input = ['A', 'B', 'C']

  dispatch(setup(input))
  dispatch(selectCard(1))
  dispatch(selectCard(2))
  dispatch(selectCard(1))

  const selected = getState().get('selected')
  const expected = [1, 2]

  expected.forEach(i => expect(selected.includes(i)).toBe(true))
})

test('action: deselectCard', () => {
  const input = ['A', 'B', 'C']

  dispatch(setup(input))
  dispatch(selectCard(1))
  dispatch(selectCard(2))
  dispatch(deselectCard(2))
  dispatch(deselectCard(0))

  const selected = getState().get('selected')
  const expected = [1]

  expected.forEach(i => expect(selected.includes(i)).toBe(true))
})

test('action: removeCard', () => {
  const input = ['A', 'B', 'C']

  dispatch(setup(input))

  const remainingBefore = getState().get('remaining')
  const expectBefore = [0, 1, 2]

  expectBefore.forEach(i => expect(remainingBefore.includes(i)).toBe(true))

  dispatch(removeCard(1))

  const remainingAfter = getState().get('remaining')
  const expectAfter = [0, 2]

  expectAfter.forEach(i => expect(remainingAfter.includes(i)).toBe(true))
})

test('action: lockGame', () => {
  dispatch(unlockGame())
  dispatch(lockGame())
  expect(getState().get('gameLocked')).toEqual('STATE_LOCKED')
})

test('action: unlockGame', () => {
  dispatch(lockGame())
  dispatch(unlockGame())
  expect(getState().get('gameLocked')).toEqual('STATE_UNLOCKED')
})

test('action: submitMatch', () => {
  dispatch(submitMatch(1))
  dispatch(submitMatch(3))
  const completed = getState().get('completedSets')
  expect(completed.includes(1)).toBe(true)
  expect(completed.includes(3)).toBe(true)
})

test('action: tick', () => {
  dispatch(tick())
  expect(getState().get('elapsedTime')).toBe(1)

  dispatch(tick())
  dispatch(tick())
  expect(getState().get('elapsedTime')).toBe(3)
})

test('action: resetTimer', () => {
  dispatch(tick())
  expect(getState().get('elapsedTime')).toBe(1)
  dispatch(resetTimer())
  expect(getState().get('elapsedTime')).toBe(0)
})

test('tracking seen count', () => {
  const input = ['A', 'B', 'C', 'A', 'B', 'C']

  dispatch(setup(input))

  dispatch(selectCard(0)) // select A1
  dispatch(selectCard(3)) // select A2
  dispatch(selectCard(1)) // select B1
  dispatch(selectCard(3)) // select A2

  const seen = getState().get('seen')

  // -----------------  A  B  C  A  B  C
  const expectedSeen = [1, 1, 0, 2, 0, 0]
  expect(expectedSeen.join()).toEqual(seen.join())
})

