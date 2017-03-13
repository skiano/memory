import React, { PropTypes } from 'react'
import classNames from 'classnames'

import styles from './Card.scss'

const Card = (props) => {
  const {
    value,
    cardSize,
    isSelected,
    isRemaining,
    isGameLocked,
    makeCardFace,
  } = props

  const className = classNames(styles.card, {
    [styles.removed]: !isRemaining,
    [styles.selected]: isSelected,
    [styles.locked]: isGameLocked && !isSelected,
  })

  const style = {
    fontSize: `${cardSize * 0.7}px`,
    lineHeight: `${cardSize}px`,
  }

  const cardFace = makeCardFace ? makeCardFace(props) : value

  return (
    <div className={className}>
      <div className={styles.front} style={style}>
        {cardFace}
      </div>
      <div className={styles.back} />
    </div>
  )
}

Card.propTypes = {
  value: PropTypes.string,
  cardSize: PropTypes.number,
  isSelected: PropTypes.bool,
  isRemaining: PropTypes.bool,
  isGameLocked: PropTypes.bool,
  makeCardFace: PropTypes.func,
}

export default Card
