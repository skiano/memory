/* eslint-disable no-unused-vars */

import createStore from './'

import {
  choose,
  setup,
  setupGame,
  lockGame,
  unlockGame,
  selectCard,
  deselectCard,
  removeCard,
  submitMatch,
} from './actions'

let getState
let dispatch
let subscribe

beforeEach(() => {
  const store = createStore()
  subscribe = store.subscribe
  getState = store.getState
  dispatch = store.dispatch
  dispatch(setup(null, null,
    () => ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C']
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
  dispatch(choose(0)) // good
  dispatch(choose(3)) // good
  expect(getState().get('selected').size).toEqual(2)
})

test('guess: partial incorrect', () => {
  dispatch(choose(3))  // good
  dispatch(choose(4))  // bad
  expect(getState().get('selected').size).toEqual(0)
})

test('guess: complete incorrect (handle sets > 2)', () => {
  dispatch(choose(0)) // good
  dispatch(choose(3)) // good
  dispatch(choose(4)) // bad
  expect(getState().get('selected').size).toEqual(0)
})

test('guess: correct', () => {
  dispatch(choose(0)) // good
  dispatch(choose(3)) // good
  dispatch(choose(6)) // good

  const state = getState()
  const cards = state.get('cards')
  const completedSet = state.get('completedSets').get(0)
  const set = state.get('sets').get(completedSet)
  const setCards = set.map(id => cards.get(id))

  expect(setCards.join('')).toEqual('AAA')
  expect(getState().get('selected').size).toEqual(0)
})

test('full game', () => {
  expect(getState().get('remaining').size).toEqual(9)

  // choose As
  dispatch(choose(3)) // good
  dispatch(choose(0)) // good
  dispatch(choose(6)) // good
  expect(getState().get('remaining').size).toEqual(6)

  // make mistake
  dispatch(choose(1)) // good
  dispatch(choose(4)) // good
  dispatch(choose(2)) // bad
  expect(getState().get('remaining').size).toEqual(6)

  // choose Bs
  dispatch(choose(1)) // good
  dispatch(choose(4)) // good
  dispatch(choose(7)) // good
  expect(getState().get('remaining').size).toEqual(3)

  // choose Cs
  dispatch(choose(8)) // good
  dispatch(choose(5)) // good
  dispatch(choose(2)) // good
  expect(getState().get('remaining').size).toEqual(0)

  const state = getState()
  const cards = state.get('cards')
  const sets = state.get('sets')
  const completedSets = state.get('completedSets')
  const cardSets = completedSets.map(setId => (
    sets.get(setId).map(cardId => cards.get(cardId))
  )).map(cardSet => cardSet.join('')).sort().join()

  expect(cardSets).toEqual('AAA,BBB,CCC')
  expect(state.get('gameState')).toEqual('STATE_COMPLETED')
})
