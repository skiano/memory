import slugify from 'slugify';
import { defaultCardMaker } from '../util/cards';
import classic from './mode.classic';
import mirrored from './mode.mirrored';
import colors from './mode.colors';
import tuples from './mode.tuples';
import formula from './mode.formula';
import names from './mode.names';

const gameModes = [
  classic,
  names,
  mirrored,
  colors,
  tuples,
  formula,
].map(mode => Object.assign({}, mode, {
  slug: slugify(mode.title.toLowerCase()),
  makeCards: mode.makeCards || defaultCardMaker,
  levels: mode.levels.map(level => Object.assign({
    slug: slugify(level.difficulty.toLowerCase()),
    setSize: level.setSize || 2,
  }, level)),
}));

/** for friendly url mapping */
export const modeMap = {};

gameModes.forEach((mode, modeId) => {
  const levels = {};

  mode.levels.forEach((level, levelId) => (
    levels[level.slug] = levelId
  ));

  modeMap[mode.slug] = {
    levels,
    id: modeId,
  };
});

export default gameModes;
