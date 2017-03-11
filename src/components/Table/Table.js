import React, { PropTypes } from 'react'
import Card from '../Card/Card'
import styles from './Table.scss'


const Table = ({ cards }) => (
  <div className={styles.table}>
    {cards.map(card => (
      <div key={card.idx}>
        <Card {... card} />
      </div>
    ))}
  </div>
)

Table.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
}

export default Table
