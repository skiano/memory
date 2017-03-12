import React, { PropTypes } from 'react'

import styles from './Shell.scss'

const Shell = ({ children }) => (
  <div className={styles.shell}>{children}</div>
)

Shell.propTypes = {
  children: PropTypes.node,
}

export default Shell
