import React from 'react'
import { Link } from 'react-router'

import Table from '../Table/Table'
import Timer from '../Timer/Timer'
import Card from '../Card/Card'
import styles from './Game.scss'

const cards = ['a', 'b', 'c']

const Game = () => (
  <div>
    <Link to="/">Home</Link>
    <h1 className={styles.header}>NYT Games Code Test</h1>
    <Timer />
    <Table>
      {cards.map(c => (<Card key={c}>{c}</Card>))}
    </Table>
  </div>
)

export default Game
