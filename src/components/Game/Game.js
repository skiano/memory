import React, { PropTypes } from 'react'

import Table from '../Table/SmartTable'
import Timer from '../Timer/SmartTimer'
import styles from './Game.scss'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSetup: false,
    }
  }

  componentWillMount() {
    this.props.setup()
  }

  componentWillUnmount() {
    // reset game
  }

  render() {
    return (
      <div>
        <header>
          <Timer />
        </header>
        <Table />
      </div>
    )
  }
}

Game.propTypes = {
  setup: PropTypes.func.isRequired,
}

export default Game
