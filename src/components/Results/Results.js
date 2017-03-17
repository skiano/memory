import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import styles from './Results.scss';
import formatTime from '../../util/formatTime';

const Card = ({ nextLink, score, elapsedTime, replay }) => (
  <ReactCSSTransitionGroup
    transitionAppear
    transitionName="fade"
    transitionAppearTimeout={500}
    transitionEnter={false}
    transitionLeave={false}>
    <div className={styles.results}>
      <h3>Congratulations!</h3>
      <p className={styles.points}>
        Your Time: {formatTime(elapsedTime)} — Your Score: {score} points.
      </p>
      <div className={styles.gameLinks}>
        <button onClick={replay}>← Play Again</button>
        <Link to="/">→ View Levels ←</Link>
        <Link to={nextLink}>Next Level →</Link>
      </div>
    </div>
  </ReactCSSTransitionGroup>
);

Card.propTypes = {
  score: PropTypes.number,
  elapsedTime: PropTypes.number,
  nextLink: PropTypes.string,
  replay: PropTypes.func,
};

export default Card;
