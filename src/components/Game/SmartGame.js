import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Game from './Game'
import { setup } from '../../store/actions'

const mapStateToProps = () => ({})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
