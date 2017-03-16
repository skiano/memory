import React from 'react';
import styles from './Score.scss';

const Score = ({ score }) => (
  <div className={styles.score}>
    {score}
  </div>
);

Score.propTypes = {
  score: React.PropTypes.number,
};

export default Score;
