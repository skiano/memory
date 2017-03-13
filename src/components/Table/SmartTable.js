import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Table from './ResponsiveTable'
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
    cards: set.map(cardId => cards[cardId]),
    isSubmitted: completedSets.includes(idx),
  }))

  return {
    sets,
    cards,
    isComplete: remaining.size < 1,
    matchSize: sets[0].length,
    isGameLocked: gameLocked === LOCKED,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ choose }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
