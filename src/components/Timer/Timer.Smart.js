import { connect } from 'react-redux'

import Timer from './Timer'

const mapStateToProps = ({ elapsedTime }) => ({ elapsedTime })

export default connect(mapStateToProps)(Timer)
