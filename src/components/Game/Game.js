import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import Table from '../Table/SmartTable'
import Timer from '../Timer/Timer'
import styles from './Game.scss'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSetup: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setup([
        'A', 'B', 'C', 'D', 'E',
        'A', 'B', 'C', 'D', 'E',
        'A', 'B', 'C', 'D', 'E',
      ])

      this.setState({ isSetup: true })
    }, 500)
  }

  componentWillUnmount() {
    // reset game
  }

  render() {
    const { isSetup } = this.state
    return isSetup ? (
      <div>
        <Link to="/">Home</Link>
        <h1 className={styles.header}>NYT Games Code Test</h1>
        <Timer />
        <Table />
      </div>
    ) : (
      <div>
        loading
      </div>
    )
  }
}

Game.propTypes = {
  setup: PropTypes.func.isRequired,
}

export default Game
