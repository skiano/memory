import React, { PropTypes } from 'react';
import styles from './Shell.scss';

class Shell extends React.Component {
  componentDidMount() {
    this.props.setup();
  }

  render() {
    return (
      <div className={styles.shell}>
        <div className={styles.content}>
          {this.props.isSetup ? this.props.children : null}
        </div>
      </div>
    );
  }
}

Shell.propTypes = {
  children: PropTypes.node,
  setup: PropTypes.func,
  isSetup: PropTypes.bool,
};

export default Shell;
