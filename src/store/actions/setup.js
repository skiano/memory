/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch';

import {
  makeCards,
  makeSets,
} from '../../util';

import {
  createGame,
  stopTimer,
  resetTimer,
  setupCards,
} from './';

export const setupModes = (modesConfig, cardMaker = makeCards) => (
  (dispatch, getState) => {
    const { cardTypes } = getState();
    const flattenedLevels = [];
    const modes = [];

    modesConfig.forEach((modeOpt) => {
      const {
        title,
        levels,
        makeCardFace,
      } = modeOpt;

      const modeId = modes.push({
        title,
        levels: [], // list of level ids
      });

      levels.forEach((level) => {
        const {
          difficulty,
          setSize,
          sets,
        } = level;

        const cards = cardMaker(level.cards || modeOpt.cards || cardTypes);

        const levelId = levels.push({
          title,
          difficulty,
          cards,
        });

        modes[modeId].levels.push(levelId);
      });
    });

    dispatch(createModes(modes));
    dispatch(createLevels(flattenedLevels));
  }
);

export const setup = (mode, level, cardMaker = makeCards) => (
  (dispatch, getState) => {
    const { cardTypes } = getState();
    const cards = cardMaker(cardTypes, mode, level);

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

export const fetchCards = () => (
  (dispatch) => {
    fetch('/api').then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }

      response.json().then(({ levels }) => {
        /** put two levels together because duplicates will be removed */
        dispatch(setupCards(levels[0].cards.concat(levels[1].cards)));
      });
    });
  }
);
