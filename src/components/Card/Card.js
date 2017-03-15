import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Card.scss';

const Card = (props) => {
  const {
    symbol,
    cardSize,
    isSelected,
    isRemaining,
    isGameLocked,
  } = props;

  const className = classNames(styles.card, {
    [styles.removed]: !isRemaining,
    [styles.selected]: isSelected,
    [styles.locked]: isGameLocked && !isSelected,
  });

  const style = {
    fontSize: `${cardSize * 0.7}px`,
  };

  const symbolStyle = props.style || {};

  return (
    <div className={className}>
      <div className={styles.front} style={style}>
        <span className={styles.symbol} style={symbolStyle}>{symbol}</span>
      </div>
      <div className={styles.back} />
    </div>
  );
};

Card.propTypes = {
  symbol: PropTypes.string,
  cardSize: PropTypes.number,
  isSelected: PropTypes.bool,
  isRemaining: PropTypes.bool,
  isGameLocked: PropTypes.bool,
  style: PropTypes.shape({}),
};

export default Card;
