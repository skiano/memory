import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Shell from './Shell';
import { setup } from '../../store/actions';

const mapStateToProps = ({ config }) => ({
  isSetup: !!(config.modes && config.modes && config.slugMap),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Shell);
