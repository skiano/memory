/* eslint-disable no-unused-vars */

import createStore from './';

import {
  setup,
  createGame,
  lockGame,
  unlockGame,
  selectCard,
  deselectCard,
  removeCard,
  submitMatch,
  resetTimer,
  tick,
} from './actions';

let getState;
let dispatch;

beforeEach(() => {
  const store = createStore();
  getState = store.getState;
  dispatch = store.dispatch;
});

test('initial state', () => {
  expect(getState().gameLocked).toBe('UNLOCKED');
  expect(getState().cards.length).toBe(0);
  expect(getState().remaining.length).toBe(0);
  expect(getState().sets.length).toBe(0);
  expect(getState().completedSets.length).toBe(0);
  expect(getState().seen.length).toBe(0);
  expect(getState().selected.length).toBe(0);
  expect(getState().elapsedTime).toBe(0);
});

test('action: setup: creates {cards, sets, remaining, seen}', () => {
  const input = ['A', 'B', 'C', 'A', 'B', 'C'];

  dispatch(setup(null, null, () => input));

  const state = getState();

  const expectedRemaining = [0, 1, 2, 3, 4, 5];
  input.map(c => expect(state.cards.includes(c)).toBe(true));
  expectedRemaining.map(i => expect(state.remaining.includes(i)).toBe(true));

  const expectedSets = ['0,3', '1,4', '2,5'];
  const flattenedSets = state.sets.map(set => set.join());
  expectedSets.map(s => expect(flattenedSets.includes(s)).toBe(true));

  const seen = state.seen;
  expect(seen.length).toEqual(6);
  seen.forEach(counter => expect(counter).toEqual(0));
});

test('action: setup: handles sets larger than 2', () => {
  const input = ['A', 'B', 'A', 'B', 'A', 'B'];
  dispatch(setup(null, null, () => input));
  expect(getState().sets.length).toEqual(2);
  expect(getState().sets[0].length).toEqual(3);
});

test('action: setup: sit sizes must match', () => {
  const input = ['A', 'B', 'C', 'A', 'B'];

  expect(() => {
    dispatch(setup(null, null, () => input));
  }).toThrowError(/Sets must be the same size/);
});

test('action: selectCard', () => {
  const input = ['A', 'B', 'C'];

  dispatch(setup(null, null, () => input));
  dispatch(selectCard(1));
  dispatch(selectCard(2));
  dispatch(selectCard(1));

  const selected = getState().selected;
  const expected = [1, 2];

  expected.forEach(i => expect(selected.includes(i)).toBe(true));
});

test('action: deselectCard', () => {
  const input = ['A', 'B', 'C'];

  dispatch(setup(null, null, () => input));
  dispatch(selectCard(1));
  dispatch(selectCard(2));
  dispatch(deselectCard(2));
  dispatch(deselectCard(0));

  const selected = getState().selected;
  const expected = [1];

  expected.forEach(i => expect(selected.includes(i)).toBe(true));
});

test('action: removeCard', () => {
  const input = ['A', 'B', 'C'];

  dispatch(setup(null, null, () => input));

  const remainingBefore = getState().remaining;
  const expectBefore = [0, 1, 2];

  expectBefore.forEach(i => expect(remainingBefore.includes(i)).toBe(true));

  dispatch(removeCard(1));

  const remainingAfter = getState().remaining;
  const expectAfter = [0, 2];

  expectAfter.forEach(i => expect(remainingAfter.includes(i)).toBe(true));
});

test('action: lockGame', () => {
  dispatch(unlockGame());
  dispatch(lockGame());
  expect(getState().gameLocked).toEqual('LOCKED');
});

test('action: unlockGame', () => {
  dispatch(lockGame());
  dispatch(unlockGame());
  expect(getState().gameLocked).toEqual('UNLOCKED');
});

test('action: submitMatch', () => {
  dispatch(submitMatch(1));
  dispatch(submitMatch(3));
  const completed = getState().completedSets;
  expect(completed.includes(1)).toBe(true);
  expect(completed.includes(3)).toBe(true);
});

test('action: tick', () => {
  dispatch(tick());
  expect(getState().elapsedTime).toBe(1);

  dispatch(tick());
  dispatch(tick());
  expect(getState().elapsedTime).toBe(3);
});

test('action: resetTimer', () => {
  dispatch(tick());
  expect(getState().elapsedTime).toBe(1);
  dispatch(resetTimer());
  expect(getState().elapsedTime).toBe(0);
});

test('tracking seen count', () => {
  const input = ['A', 'B', 'C', 'A', 'B', 'C'];

  dispatch(setup(null, null, () => input));

  dispatch(selectCard(0)); // select A1
  dispatch(selectCard(3)); // select A2
  dispatch(selectCard(1)); // select B1
  dispatch(selectCard(3)); // select A2

  const seen = getState().seen;

  // -----------------  A  B  C  A  B  C
  const expectedSeen = [1, 1, 0, 2, 0, 0];
  expect(expectedSeen.join()).toEqual(seen.join());
});

