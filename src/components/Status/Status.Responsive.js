import React, { PropTypes } from 'react';
import eventListener from 'eventlistener';

import Status from './Status';
import styles from './Status.scss';

function getLayout() {}

class ResponsiveStatus extends React.Component {
  constructor(props) {
    super(props);
    this.respond = this.respond.bind(this);
    this.state = {};
  }

  componentDidMount() {
    eventListener.add(global.window, 'resize', this.respond);
    this.respond();
  }

  componentWillUnmount() {
    eventListener.remove(global.window, 'resize', this.respond);
  }

  respond() {
    const { sets } = this.props;
    const { offsetWidth, offsetHeight } = this.wrapper;

    this.setState(
      getLayout(sets, [offsetWidth, offsetHeight]),
    );
  }

  render() {
    const inner = this.state.positions ? (
      <Status {...this.props} {...this.state} />
    ) : null;

    return (
      <div
        className={styles.status}
        ref={(div) => { this.wrapper = div; }}>
        {inner}
      </div>
    );
  }
}

ResponsiveStatus.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.object),
};

export default ResponsiveStatus;
