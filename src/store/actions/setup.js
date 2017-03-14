import fetch from 'isomorphic-fetch';
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
        const {
          difficulty,
          setSize,
          sets,
        } = level;

        const levelsLength = flattenedLevels.push({
          slug: level.slug,
          cards: mode.makeCards(sets, setSize, cardTypes),
          difficulty,
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
    fetch('/api').then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }

      response.json().then(({ levels }) => {
        /** put two levels together and remove dublicates */
        const cardTypes = unique(levels[0].cards.concat(levels[1].cards));
        dispatch(setupModes(GAME_MODES, cardTypes));
      });
    });
  }
);

export const setupGame = levelId => (
  (dispatch, getState) => {
    let cards;

    /** allow setupModes to be circumvented */
    if (Array.isArray(levelId)) {
      cards = shuffle(levelId);
    } else {
      const { levels } = getState().config;
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
  }
);
