import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './Game.scss';
import Table from '../Table/Table.Smart';
import Timer from '../Timer/Timer.Smart';
import Status from '../Status/Status.Smart';

class Game extends React.Component {
  componentWillMount() {
    const { mode, level } = this.props.routeParams;
    this.props.setupGame(this.props.slugMap[mode].levels[level]);
  }

  render() {
    return (
      <div className={styles.game}>
        <header className={styles.header}>
          <Link to="/">Home</Link>
        </header>
        <div className={styles.table}>
          <Table />
        </div>
        <div className={styles.status}>
          <div><Timer /></div>
          <Status />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  slugMap: PropTypes.shape({}),
  setupGame: PropTypes.func.isRequired,
  routeParams: PropTypes.shape({
    mode: PropTypes.string,
    level: PropTypes.string,
  }),
};

export default Game;
