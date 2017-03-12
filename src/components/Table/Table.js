import React, { PropTypes } from 'react'
import Card from '../Card/Card'
import styles from './Table.scss'


const Table = ({ cards, choose }) => (
  <div className={styles.table}>
    {cards.map(card => (
      <button
        className={styles.button}
        key={card.idx}
        onClick={() => choose(card.idx)}>
        <Card {... card} />
      </button>
    ))}
  </div>
)

Table.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  choose: PropTypes.func.isRequired,
}

export default Table
