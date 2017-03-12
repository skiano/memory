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

  componentDidMount() {
    /** dispatch the setup from api */
    setTimeout(() => {
      this.props.setup(['⍨', '✈', '☆', '♘', '⍨', '♫', '♠', '✈', '❄', '✈', '♘', '☆', '❄', '☯', '☯', '♫', '♠', '⍨', '☯', '☆', '❄', '♘', '♫', '♠'])

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
        <header>
          <Timer />
        </header>
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
