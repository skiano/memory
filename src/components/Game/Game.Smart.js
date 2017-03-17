import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Game from './Game';
import { setupGame } from '../../store/actions';

const mapStateToProps = ({ config }) => config;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setupGame }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
