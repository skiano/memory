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
  const input = ['A', 'B', 'C', 'A', 'B', 'C']
  const expectedSets = ['0,3', '1,4', '2,5']

  const unsubscribe = store.subscribe(() => {
    const { cards, sets } = store.getState()
    input.map(c => expect(cards).toContain(c))

    const flattenedSets = sets.map(set => set.join())
    expectedSets.map(s => expect(flattenedSets).toContain(s))
  })

  store.dispatch(setupGame(input))

  unsubscribe()
})
