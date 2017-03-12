import React, { PropTypes } from 'react'
import Card from '../Card/Card'
import styles from './Table.scss'

const Table = ({ cards, positions, cardSize, choose }) => (
  <div>
    {cards.map(card => (
      <button
        className={styles.button}
        style={{
          lineHeight: `${cardSize}px`,
          height: cardSize,
          width: cardSize,
          left: positions[card.idx][0],
          top: positions[card.idx][1],
        }}
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
  cardSize: PropTypes.number,
  positions: PropTypes.arrayOf(PropTypes.array),
}

export default Table
