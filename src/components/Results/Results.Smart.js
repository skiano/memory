import { connect } from 'react-redux';
import Results from './Results';

const mapStateToProps = ({ score, elapsedTime }) => ({
  score,
  elapsedTime,
});

export default connect(mapStateToProps)(Results);
