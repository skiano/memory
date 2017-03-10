import createStore, { setupGame } from './index'

test('Initial State', () => {
  const initial = createStore().getState()
  expect(initial.gameState).toBe('PENDING')
  expect(initial.cards.length).toBe(0)
  expect(initial.sets.length).toBe(0)
  expect(initial.seen.length).toBe(0)
  expect(initial.selected.length).toBe(0)
})

test('Setup Game: standard', () => {
  const store = createStore()

  // const unsubscribe = store.subscribe(() =>
  //   console.log(store.getState())
  // )

  store.dispatch(setupGame(['A', 'B', 'C', 'A', 'B', 'C']))

  // unsubscribe()
})
