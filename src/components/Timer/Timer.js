import React from 'react';

import formatTime from '../../util/formatTime';
import styles from './Timer.scss';

const Timer = ({ elapsedTime = 0 }) => (
  <div className={styles.timer}>
    {formatTime(elapsedTime)}
  </div>
);

Timer.propTypes = {
  elapsedTime: React.PropTypes.number,
};

export default Timer;
