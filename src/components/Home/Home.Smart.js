import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = (state) => {
  const { modes, levels } = state.config;

  return {
    modes: modes.map(mode => (
      Object.assign({}, mode, {
        levels: mode.levels.map(levelId => levels[levelId]),
      })
    )),
  };
};

export default connect(mapStateToProps)(Home);
