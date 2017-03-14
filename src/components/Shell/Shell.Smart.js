import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Shell from './Shell';
import { fetchCards } from '../../store/actions';

const mapStateToProps = ({ cardTypes }) => ({
  hasCardTypes: cardTypes.length > 0,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCards }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Shell);
