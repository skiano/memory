import { connect } from 'react-redux';
import Score from './Score';
import { TOTAL_POINTS } from '../../util/scoreKeeper';

const mapStateToProps = ({ score, cards }) => ({
  score,
  maxScore: TOTAL_POINTS * cards.length,
});

export default connect(mapStateToProps)(Score);
