import { connect } from 'react-redux'

import Status from './Status.Responsive'
import { COMPLETED } from '../../store/constants'
import { getCardPropsFromState } from '../../util/state-helpers'

const mapStateToProps = (state) => {
  const { gameState, completedSets, sets } = state
  return {
    sets: sets.map((set, setId) => ({
      idx: setId,
      isSubmitted: completedSets.includes(setId),
      cards: set.map(cardId => (
        getCardPropsFromState(cardId, state)
      )),
    })),
    isComplete: gameState === COMPLETED,
    matchSize: sets[0].length,
  }
}

export default connect(mapStateToProps)(Status)
