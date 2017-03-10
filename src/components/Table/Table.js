import React, { PropTypes } from 'react'
import styles from './Table.scss'
import Card from '../Card/Card'

class Table extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: [],
    }
  }

  render() {
    const { cards } = this.props

    return (
      <div className={styles.table}>
        {cards.map(c => (
          <Card key={c}>{c}</Card>
        ))}
      </div>
    )
  }
}

Table.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string),
}

export default Table
