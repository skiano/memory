import React from 'react';
import { Link } from 'react-router';

import styles from './Home.scss';
import modes from '../../modes';

const Home = () => (
  <div className={styles.home}>
    {
      modes.map((mode, modeId) => (
        <div key={modeId} className={styles.mode}>
          <h3>{mode.title}</h3>
          <nav>
            {
              mode.levels.map((level, levelId) => (
                <Link
                  className={styles.modeLink}
                  key={levelId}
                  to={`/play/${mode.slug}/${level.slug}`}>
                  {level.difficulty}
                </Link>
              ))
            }
          </nav>
        </div>
      ))
    }
  </div>
);

export default Home;
