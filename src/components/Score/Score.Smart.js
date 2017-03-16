import { connect } from 'react-redux';

import Score from './Score';

const mapStateToProps = ({ score }) => ({ score });

export default connect(mapStateToProps)(Score);
