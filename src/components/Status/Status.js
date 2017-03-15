import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Status.scss';

const Status = ({ sets, isComplete }) => {
  const setBlocks = sets.map(({ isSubmitted, cards }, setId) => {
    const setClass = classNames(styles.setBlock, {
      [styles.submitted]: isSubmitted,
    });

    return (
      <div key={setId} className={setClass}>
        {cards.map(({ isSelected, value }, cardId) => {
          const cardClass = classNames(styles.cardIcon, {
            [styles.selected]: isSelected,
          });

          return (
            <span key={cardId} className={cardClass} />
          );
        })}
      </div>
    );
  });

  return (
    <div
      className={classNames(styles.setWrap, {
        [styles.complete]: isComplete,
      })}>
      {setBlocks}
    </div>
  );
};

Status.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.object),
  isComplete: PropTypes.bool,
};

export default Status;
