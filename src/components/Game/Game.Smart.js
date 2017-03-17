import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Game from './Game';
import { setupGame } from '../../store/actions';
import { COMPLETED } from '../../store/constants';

const mapStateToProps = ({ config, gameState }) => ({
  levels: config.levels,
  modes: config.modes,
  slugMap: config.slugMap,
  isComplete: gameState === COMPLETED,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setupGame }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
