import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Shell from './Shell'
import { fetchCards } from '../../store/actions'

const mapStateToProps = state => ({
  hasCardTypes: !!state.get('cardTypes').size,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCards }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Shell)
