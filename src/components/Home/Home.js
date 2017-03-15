import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.scss';

const Home = ({ modes }) => (
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

Home.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    levels: PropTypes.arrayOf(PropTypes.shape({
      difficulty: PropTypes.string,
      slug: PropTypes.string,
    })),
  })),
};

export default Home;
