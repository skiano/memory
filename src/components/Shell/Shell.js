import React, { PropTypes } from 'react'
import styles from './Shell.scss'

class Shell extends React.Component {
  componentDidMount() {
    this.props.fetchCards()
  }

  render() {
    return (
      <div className={styles.shell}>
        {this.props.hasCardTypes ? this.props.children : null}
      </div>
    )
  }
}

Shell.propTypes = {
  children: PropTypes.node,
  fetchCards: PropTypes.func,
  hasCardTypes: PropTypes.bool,
}

export default Shell
