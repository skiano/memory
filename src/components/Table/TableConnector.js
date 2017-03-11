import choose from '../../store/choose'

/** map state to props */
export const getTableSnapshot = (state) => {
  const cards = state.get('cards')
  const sets = state.get('sets')

  return {
    mode: 'game mode',
    score: 'whatever',
    matchSize: sets.get(0).length,
    sets: sets.map((value, idx) => ({
      idx,
      cards: value.map(i => cards[i]),
      isSubmitted: false,
    })),
    cards: cards.map((value, idx) => ({
      idx,
      value,
      isSelected: false,
      isPending: true,
      setIdx: 1,
    })),
  }
}

/** map actions to props */
export const getTableActions = dispatch => ({
  choose(cardId) {
    dispatch(choose(cardId))
  },
})
