import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './Game.scss';
import Table from '../Table/Table.Smart';
import Timer from '../Timer/Timer.Smart';
import { modeMap } from '../../modes';

class Game extends React.Component {
  componentWillMount() {
    const { mode, level } = this.props.routeParams;
    this.props.setup(
      modeMap[mode].id,
      modeMap[mode].levels[level]
    );
  }

  render() {
    return (
      <div className={styles.game}>
        <header className={styles.header}>
          <Link to="/">Home</Link>
          <Timer />
        </header>
        <div className={styles.table}>
          <Table />
        </div>
        <div className={styles.status}>
          status goes here
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  setup: PropTypes.func.isRequired,
  routeParams: PropTypes.shape({
    mode: PropTypes.string,
    level: PropTypes.string,
  }),
};

export default Game;
