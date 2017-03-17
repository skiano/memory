import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './Game.scss';
import Table from '../Table/Table.Smart';
import Timer from '../Timer/Timer.Smart';
import Score from '../Score/Score.Smart';
import Status from '../Status/Status.Smart';

class Game extends React.Component {
  componentWillMount() {
    const { levels, modes, routeParams, slugMap } = this.props;
    const mode = slugMap[routeParams.mode];
    const levelId = mode.levels[routeParams.level];
    this.props.setupGame(levelId);
    this.state = {
      title: modes[mode.id].title,
      difficulty: levels[levelId].difficulty,
    };
  }

  render() {
    return (
      <div className={styles.game}>
        <header className={styles.header}>
          <Link to="/">Home</Link>
          <h2>{this.state.title} • <span>{this.state.difficulty}</span></h2>
        </header>
        <div className={styles.table}>
          <Table />
        </div>
        <div className={styles.status}>
          <div><Timer /></div>
          <div><Status /></div>
          <div><Score /></div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  slugMap: PropTypes.shape({}),
  setupGame: PropTypes.func.isRequired,
  modes: PropTypes.arrayOf(PropTypes.shape({})),
  levels: PropTypes.arrayOf(PropTypes.shape({})),
  routeParams: PropTypes.shape({}),
};

export default Game;
