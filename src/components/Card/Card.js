import React, { PropTypes, cloneElement } from 'react';
import classNames from 'classnames';
import styles from './Card.scss';

const Card = (props) => {
  const {
    symbol,
    cardSize,
    isSelected,
    isRemaining,
    isGameLocked,
    cardFace,
  } = props;

  const className = classNames(styles.card, {
    [styles.removed]: !isRemaining,
    [styles.selected]: isSelected,
    [styles.locked]: isGameLocked && !isSelected,
  });

  const style = {
    fontSize: `${cardSize * 0.7}px`,
    lineHeight: `${cardSize}px`,
  };

  return (
    <div className={className}>
      <div className={styles.front} style={style}>
        { cardFace ? cloneElement(cardFace, props) : symbol }
      </div>
      <div className={styles.back} />
    </div>
  );
};

Card.propTypes = {
  symbol: PropTypes.string,
  cardFace: PropTypes.node,
  cardSize: PropTypes.number,
  isSelected: PropTypes.bool,
  isRemaining: PropTypes.bool,
  isGameLocked: PropTypes.bool,
};

export default Card;
