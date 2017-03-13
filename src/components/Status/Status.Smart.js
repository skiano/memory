import { connect } from 'react-redux'

import Status from './Status.Responsive'
import { COMPLETED } from '../../store/constants'
import { getCardPropsFromState } from '../../util/state-helpers'

const mapStateToProps = (state) => {
  const gameState = state.get('gameState')
  const completedSets = state.get('completedSets')

  const sets = state.get('sets').map((set, setId) => ({
    idx: setId,
    isSubmitted: completedSets.includes(setId),
    cards: set.map(cardId => (
      getCardPropsFromState(cardId, state)
    )),
  })).toJS()

  return {
    sets,
    isComplete: gameState === COMPLETED,
    matchSize: sets[0].length,
  }
}

export default connect(mapStateToProps)(Status)
