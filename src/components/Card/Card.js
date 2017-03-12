import React, { PropTypes } from 'react'
import classNames from 'classnames'

import styles from './Card.scss'

const Card = ({ value, isSelected, isRemaining }) => {
  const className = classNames(styles.card, {
    [styles.removed]: !isRemaining,
    [styles.selected]: isSelected,
  })

  return (
    <div className={className}>
      <div className={styles.front}>
        {value}
      </div>
      <div className={styles.back}/>
    </div>
  )
}

Card.propTypes = {
  value: PropTypes.string,
  isSelected: PropTypes.bool,
  isRemaining: PropTypes.bool,
}

export default Card
