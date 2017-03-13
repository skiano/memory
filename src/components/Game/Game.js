import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import Table from '../Table/SmartTable'
import Timer from '../Timer/SmartTimer'
import { modeMap } from '../../modes'
import './Game.scss'

class Game extends React.Component {
  componentWillMount() {
    const { mode, level } = this.props.routeParams
    this.props.setup(
      modeMap[mode].id,
      modeMap[mode].levels[level]
    )
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
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
