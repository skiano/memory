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
    /** dispatch the setup from api */
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
        <Table />
        <Timer />
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
