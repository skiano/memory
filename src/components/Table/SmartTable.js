import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Table from './ResponsiveTable'
import { choose } from '../../store/choose'
import { STATE_LOCKED } from '../../store/constants'

const mapStateToProps = (state) => {
  const sets = state.get('sets')
  const cards = state.get('cards')
  const selected = state.get('selected')
  const remaining = state.get('remaining')
  const completedSets = state.get('completedSets')
  const gameLocked = state.get('gameLocked')

  return {
    isComplete: remaining.size < 1,
    matchSize: sets.get(0).length,
    isGameLocked: gameLocked === STATE_LOCKED,
    sets: sets.map((set, idx) => ({
      idx,
      cards: set.map(cardId => cards.get(cardId)),
      isSubmitted: completedSets.includes(idx),
    })).toJS(),
    cards: cards.map((value, idx) => ({
      idx,
      value,
      isSelected: selected.includes(idx),
      isRemaining: remaining.includes(idx),
      setIdx: 1,
    })).toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ choose }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
