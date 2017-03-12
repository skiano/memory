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

  return (
    <div className={className} style={style}>
      <div className={styles.front}>
        {value}
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
}

export default Card
