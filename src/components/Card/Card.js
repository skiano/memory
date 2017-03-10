import React, { PropTypes } from 'react'

import styles from './Card.scss'

const Card = ({ children }) => (
  <div className={styles.card}>{children}</div>
)

Card.propTypes = {
  children: PropTypes.node,
}

export default Card
