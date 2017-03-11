import React from 'react'
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
    // setup game
    setTimeout(() => {
      this.setState({
        isSetup: true,
      })
    }, 1500)
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

export default Game
