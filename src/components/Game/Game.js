import React from 'react'
import { Link } from 'react-router'

import Table from '../Table/Table'
import Timer from '../Timer/Timer'
import styles from './Game.scss'

const cards = ['a', 'b', 'c']

const Game = () => (
  <div>
    <Link to="/">Home</Link>
    <h1 className={styles.header}>NYT Games Code Test</h1>
    <Timer />
    <Table cards={cards} />
  </div>
)

export default Game
