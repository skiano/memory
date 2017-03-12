import React, { PropTypes } from 'react'
import classNames from 'classnames'

import styles from './Card.scss'

const Card = ({ value, isSelected, isRemaining }) => (
  <div className={classNames(styles.card, {
    [styles.remaining]: isRemaining,
    [styles.selected]: isSelected,
  })}>{value}</div>
)

Card.propTypes = {
  value: PropTypes.string,
  isSelected: PropTypes.bool,
  isRemaining: PropTypes.bool,
}

export default Card
