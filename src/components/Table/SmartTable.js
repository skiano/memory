import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Table from './Table'
import choose from '../../store/choose'

const mapStateToProps = (state) => {
  const sets = state.get('sets')
  const cards = state.get('cards')
  const remaining = state.get('remaining')

  console.log(`
    sets: ${sets}
    cards: ${cards}
    remaining: ${remaining}
  `)

  return {}

  // return {
  //   mode: 'game mode',
  //   score: 'whatever',
  //   matchSize: sets.get(0).length,
  //   isComplete: remaining.size < 1,
  //   sets: sets.map((value, idx) => ({
  //     idx,
  //     cards: value.map(i => cards[i]),
  //     isSubmitted: false,
  //   })),
  //   cards: cards.map((value, idx) => ({
  //     idx,
  //     value,
  //     isSelected: false,
  //     isPending: true,
  //     setIdx: 1,
  //   })),
  // }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ choose }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
