import React from 'react'
import { Link } from 'react-router'

import styles from './Home.scss'

const Home = () => (
  <div className={styles.home}>
    <Link to="/play/classic/easy">Play Classic (easy)</Link>
    <Link to="/play/classic/hard">Play Classic (hard)</Link>
    <Link to="/play/classic/tripples">Play Classic (tripples)</Link>
  </div>
)

export default Home
