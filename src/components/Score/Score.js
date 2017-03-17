import React from 'react';
import styles from './Score.scss';

const Score = ({ score, maxScore }) => (
  <div className={styles.score}>
    <span className={styles.scoreNumber}>Score: {score}/{maxScore}</span>
    <span className={styles.scoreBar}>
      <span
        className={styles.juice}
        style={{
          right: `${100 - ((score / maxScore) * 100)}%`,
        }} />
    </span>
  </div>
);

Score.propTypes = {
  score: React.PropTypes.number,
  maxScore: React.PropTypes.number,
};

export default Score;
