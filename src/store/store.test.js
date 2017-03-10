import createStore, {
  setupGame,
  selectCard,
  deselectCard,
} from './index'

test('Initial State', () => {
  const initial = createStore().getState()
  expect(initial.gameState).toBe('PENDING')
  expect(initial.cards.length).toBe(0)
  expect(initial.remaining.length).toBe(0)
  expect(initial.sets.length).toBe(0)
  expect(initial.seen.length).toBe(0)
  expect(initial.selected.length).toBe(0)
})

test('Setup Game: standard', () => {
  const store = createStore()
  const input = ['A', 'B', 'C', 'A', 'B', 'C']
  const expectedSets = ['0,3', '1,4', '2,5']
  const expectedRemaining = [0, 1, 2, 3, 4, 5]

  store.dispatch(setupGame(input))

  const { cards, sets, remaining } = store.getState()

  input.map(c => expect(cards).toContain(c))
  expectedRemaining.map(i => expect(remaining).toContain(i))

  const flattenedSets = sets.map(set => set.join())
  expectedSets.map(s => expect(flattenedSets).toContain(s))
})

test('selectCard', () => {
  const store = createStore()
  const input = ['A', 'B', 'C']

  store.dispatch(setupGame(input))
  store.dispatch(selectCard(1))
  store.dispatch(selectCard(2))
  store.dispatch(selectCard(1))

  expect(store.getState().selected.join()).toBe('1,2')
})

test('deselectCard', () => {
  const store = createStore()
  const input = ['A', 'B', 'C']

  store.dispatch(setupGame(input))
  store.dispatch(selectCard(1))
  store.dispatch(selectCard(2))
  store.dispatch(deselectCard(2))
  store.dispatch(deselectCard(0))

  expect(store.getState().selected.join()).toBe('1')
})

test('removeCard', () => {
  const store = createStore()
  const input = ['A', 'B', 'C']

  store.dispatch(setupGame(input))

  expect(store.getState().remaining.join()).toBe('0,1,2')
})
