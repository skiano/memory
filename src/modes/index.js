import slugify from 'slugify';
import { defaultCardMaker } from '../util';
import classic from './mode.classic';
import spin from './mode.spin';
import colors from './mode.colors';
import tuples from './mode.tuples';
import formula from './mode.formula';
import names from './mode.names';
import dictionaries from './mode.dictionaries';

const GAME_MODES = [
  classic,
  names,
  spin,
  colors,
  formula,
  tuples,
  ...dictionaries,
].map(mode => Object.assign({}, mode, {
  slug: slugify(mode.title.toLowerCase()),
  makeCards: mode.makeCards || defaultCardMaker,
  levels: mode.levels.map(level => Object.assign({
    slug: slugify(level.difficulty.toLowerCase()),
    setSize: level.setSize || 2,
    sets: level.sets || 4,
  }, level)),
}));

export default GAME_MODES;
