import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Game from './Game'
import { setup } from '../../store/setup'

const mapStateToProps = state => ({
  isComplete: state.get('remaining') < 1,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
