import GAME_MODES from '../../modes';

import {
  unique,
  shuffle,
  makeSets,
} from '../../util';

import {
  createGame,
  stopTimer,
  resetTimer,
  setConfig,
} from './';

export const setupModes = (modesConfig, cardTypes) => (
  (dispatch) => {
    const slugMap = {};
    const flattenedLevels = [];
    const modes = [];

    /*
     * Flatten out the levels to make next level simple
     * create cards for all modes/levels
     */
    modesConfig.forEach((mode, modeId) => {
      slugMap[mode.slug] = {
        id: modeId,
        levels: {},
      };

      modes.push({
        title: mode.title,
        slug: mode.slug,
        levels: [],
      });

      mode.levels.forEach((level) => {
        const levelsLength = flattenedLevels.push({
          slug: level.slug,
          difficulty: level.difficulty,
          cards: mode.makeCards(level, cardTypes),
          link: `${mode.slug}/${level.slug}`,
          modeId,
        });

        const levelId = levelsLength - 1;

        /** give levelIds back to parent mode */
        modes[modeId].levels.push(levelId);
        slugMap[mode.slug].levels[level.slug] = levelId;
      });
    });

    dispatch(setConfig({ modes }));
    dispatch(setConfig({ levels: flattenedLevels }));
    dispatch(setConfig({ slugMap }));
  }
);

export const setup = () => (
  (dispatch) => {
    // NOTE: there used to be an api call here, but i removed it
    // for static deployment
    const createLevels = () => [
      {
        cards: ['✈','♘','✈','♫','♫','☆','♘','☆'],
        difficulty: 'easy'
      },
      {
        cards: ['❄','⍨','♘','✈','☯','♠','☆','❄','♫','♫','☯','☆','✈','⍨','♠','♘'],
        difficulty: 'hard'
      }
    ]

    setTimeout(() => {
      const levels = createLevels();
      const cardTypes = unique(levels[0].cards.concat(levels[1].cards));
      dispatch(setupModes(GAME_MODES, cardTypes));
    }, 10);
  }
);

export const setupGame = levelId => (
  (dispatch, getState) => {
    let levels = [];
    let cards;

    /** allow setupModes to be circumvented */
    if (Array.isArray(levelId)) {
      cards = levelId;
    } else {
      levels = getState().config.levels;
      cards = shuffle(levels[levelId].cards);
    }

    dispatch(stopTimer());
    dispatch(resetTimer());

    dispatch(createGame({
      cards,
      sets: makeSets(cards),
      remaining: cards.map((c, i) => i),
      seen: cards.map(() => 0),
    }));

    dispatch(setConfig({
      currentLevel: levelId,
      previousLevel: levelId > 0 ? levelId - 1 : null,
      nextLevel: levelId < levels.length - 1 ? levelId += 1 : null,
    }));
  }
);
