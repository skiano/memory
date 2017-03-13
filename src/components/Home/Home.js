import React from 'react'
import { Link } from 'react-router'

import styles from './Home.scss'
import modes from '../../modes'

const Home = () => (
  <div className={styles.home}>
    {
      modes.map((mode, modeId) => (
        <div key={modeId}>
          <h3>{mode.title}</h3>
          {
            mode.levels.map((level, levelId) => (
              <Link
                key={levelId}
                to={`/play/${mode.slug}/${level.difficulty}`}>
                {level.difficulty}
              </Link>
            ))
          }
        </div>
      ))
    }
    <Link to="/play/classic/easy">Play Classic (easy)</Link>
    <Link to="/play/classic/hard">Play Classic (hard)</Link>
    <Link to="/play/classic/tripples">Play Classic (tripples)</Link>
  </div>
)

export default Home
