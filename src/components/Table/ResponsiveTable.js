import React, { PropTypes } from 'react'
import eventListener from 'eventlistener'

import Table from '../Table/Table'
import styles from './Table.scss'
import { getLayout } from '../../util/layout'

/** look into raf to see if it will help? */

class ResponsiveTable extends React.Component {
  constructor(props) {
    super(props)
    this.respond = this.respond.bind(this)
    this.state = {}
  }

  componentDidMount() {
    eventListener.add(global.window, 'resize', this.respond)
    this.respond()
  }

  componentWillUnmount() {
    eventListener.remove(global.window, 'resize', this.respond)
  }

  respond() {
    const cardCount = this.props.cards.length
    const { offsetWidth, offsetHeight } = this.wrapper

    console.log(offsetWidth, offsetHeight)

    this.setState(
      getLayout(cardCount, [offsetWidth, offsetHeight]),
    )
  }

  render() {
    const inner = this.state.positions ? (
      <Table {...this.props} {...this.state} />
    ) : null

    return (
      <div
        className={styles.table}
        ref={(div) => { this.wrapper = div }}>
        {inner}
      </div>
    )
  }
}

ResponsiveTable.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
}

export default ResponsiveTable
