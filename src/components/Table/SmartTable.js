import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Table from './Table'
import { choose } from '../../store/choose'

const mapStateToProps = (state) => {
  const sets = state.get('sets')
  const cards = state.get('cards')
  const selected = state.get('selected')
  const remaining = state.get('remaining')
  const completedSets = state.get('completedSets')

  return {
    isComplete: remaining.size < 1,
    matchSize: sets.get(0).length,
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
