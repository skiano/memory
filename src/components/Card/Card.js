import React, { PropTypes } from 'react'

import styles from './Card.scss'

const Card = ({ value }) => (
  <div className={styles.card}>{value}</div>
)

Card.propTypes = {
  value: PropTypes.string,
}

export default Card
