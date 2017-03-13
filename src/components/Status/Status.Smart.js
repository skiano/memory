import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Status from './Status.Responsive'
import { choose } from '../../store/actions'
import { LOCKED } from '../../store/constants'

const mapStateToProps = (state) => {
  const selected = state.get('selected')
  const remaining = state.get('remaining')
  const completedSets = state.get('completedSets')
  const gameLocked = state.get('gameLocked')

  /** prepare the cards so they are easy for component */
  const cards = state.get('cards').toJS().map((card, idx) => {
    const { value, props } = card

    return Object.assign({
      idx,
      value,
      isSelected: selected.includes(idx),
      isRemaining: remaining.includes(idx),
    }, props)
  })

  /** prepare sets for status component */
  const sets = state.get('sets').toJS().map((set, idx) => ({
    idx,
    cards: set.map(cardId => {
      const { value, props } = state.get('cards').get(cardId)
      
    }),
    isSubmitted: completedSets.includes(idx),
  }))

  return {
    sets,
    isComplete: remaining.size < 1,
    matchSize: sets[0].length,
  }
}

export default connect(mapStateToProps)(Status)
