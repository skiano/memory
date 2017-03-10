import React from 'react'
import { Link } from 'react-router'

import styles from './Home.scss'

const Home = () => (
  <div className={styles.home}>
    Hello Gamer!
    <Link to="/play">Play</Link>
  </div>
)

export default Home
