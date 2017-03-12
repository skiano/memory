import React, { PropTypes } from 'react'

import Table from '../Table/SmartTable'
import Timer from '../Timer/SmartTimer'
import './Game.scss'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSetup: false,
    }
  }

  componentWillMount() {
    const { mode, level } = this.props.routeParams
    this.props.setup(mode, level)
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
  routeParams: PropTypes.shape({
    mode: PropTypes.string,
    level: PropTypes.string,
  }),
}

export default Game
