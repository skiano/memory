import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './Game.scss';
import Table from '../Table/Table.Smart';
import Timer from '../Timer/Timer.Smart';
import Score from '../Score/Score.Smart';
import Status from '../Status/Status.Smart';
import Results from '../Results/Results.Smart';

class Game extends React.Component {
  componentWillMount() {
    /** look into cleaner ways to do this */
    /** perhaps using: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux */

    /** fails on bad params! */

    const { levels, modes, routeParams, slugMap } = this.props;
    const mode = slugMap[routeParams.mode];
    const levelId = mode.levels[routeParams.level];

    this.props.setupGame(levelId);

    this.state = {
      levelId,
      title: modes[mode.id].title,
      difficulty: levels[levelId].difficulty,
    };

    this.reset = this.reset.bind(this);
  }

  reset() {
    console.log('reset');
    this.props.setupGame(this.state.levelId);
  }

  render() {
    return (
      <div className={styles.game}>
        <header className={styles.header}>
          <Link className={styles.homeLink} to="/">→ Memory ←</Link>
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
        {this.props.isComplete ? (
          <Results replay={this.reset} nextLink="/play/classic/hard" />
        ) : null}
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
  isComplete: PropTypes.bool,
};

export default Game;
