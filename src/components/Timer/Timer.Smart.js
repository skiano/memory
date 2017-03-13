import { connect } from 'react-redux'

import Timer from './Timer'

const mapStateToProps = state => ({
  elapsedTime: state.get('elapsedTime'),
})

export default connect(mapStateToProps)(Timer)
