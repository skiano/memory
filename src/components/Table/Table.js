import React, { PropTypes } from 'react'
import Card from '../Card/Card'
import styles from './Table.scss'

const Table = (props) => {
  const {
    cards,
    choose,
    cardSize,
    positions,
    isGameLocked,
  } = props

  const cardComponents = cards.map((card) => {
    const style = {
      height: cardSize,
      width: cardSize,
      left: positions[card.idx][0],
      top: positions[card.idx][1],
    }

    return (
      <button
        className={styles.button}
        style={style}
        key={card.idx}
        onClick={() => choose(card.idx)}>
        <Card
          {... card}
          isGameLocked={isGameLocked}
          cardSize={cardSize} />
      </button>
    )
  })

  return (
    <div>
      {cardComponents}
    </div>
  )
}

Table.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  choose: PropTypes.func.isRequired,
  cardSize: PropTypes.number,
  positions: PropTypes.arrayOf(PropTypes.array),
  isGameLocked: PropTypes.bool,
}

export default Table
