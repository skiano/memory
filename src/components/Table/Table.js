import React, { PropTypes } from 'react'

import styles from './Table.scss'

class Table extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: [],
    }
  }

  render() {
    const { children } = this.props

    return (
      <div className={styles.table}>
        {children}
      </div>
    )
  }
}

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
}

export default Table
