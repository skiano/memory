import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Table from './Table.Responsive'
import { choose } from '../../store/actions'
import { LOCKED, COMPLETED } from '../../store/constants'
import { getCardPropsFromState } from '../../util/state-helpers'

const mapStateToProps = (state) => {
  const gameState = state.get('gameState')
  const gameLocked = state.get('gameLocked')

  const cards = state.get('cards').map((card, cardId) => (
    getCardPropsFromState(cardId, state)
  )).toJS()

  return {
    cards,
    isComplete: gameState === COMPLETED,
    isGameLocked: gameLocked === LOCKED,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ choose }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
