import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Game from './Game'
import { setup } from '../../store/setup'

const mapStateToProps = (state) => {
  const remaining = state.get('remaining')
  return {
    isComplete: remaining.size < 1,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
