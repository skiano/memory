import modes from '../modes';
import shuffle from './shuffle';

const DEFAULT_SET_SIZE = 2;

export const defaultCardMaker = (totalSets, setSize, cardTypes) => {
  console.log(totalSets, setSize, cardTypes);
};

export const makeCards = (defaultCards, modeId, levelId) => {
  const mode = modes[modeId];
  const level = mode.levels[levelId];
  const { title, makeCardFace } = mode;
  const { difficulty, sets } = level;

  /** allow cards to be overwritten at in the mode or level  */
  const cards = level.cards || mode.cards || defaultCards;
  const setSize = level.setSize || DEFAULT_SET_SIZE;

  /** make sure enough cards are supplied to the level */
  if (sets > cards.length) {
    throw new Error(`
      Levels cannot have more than ${cards.length} sets.
      -> ${title}:${difficulty} requested ${sets} sets
    `);
  }

  /* Get enough card types to make the requisite sets */
  const baseCards = cards.slice(-sets);
  const emptySet = Array(...Array(setSize));

  /** Create the cards and shuffle them **/
  return shuffle(baseCards.reduce((final, card, setId) => {
    /** if the card is not an object with a value key */
    card = card.value ? card : { value: card };

    /** pass all data to the card face maker */
    return final.concat(emptySet.map((empty, setPosition) => (
      (!makeCardFace) ? card.value : makeCardFace(Object.assign({
        setId,
        setSize,
        setPosition,
      }))
    )));
  }, []));
};

export function cardsMatch(a, b) {
  if (typeof a === 'string') { return a === b; }
  return a.value === b.value;
}

export function vallidateSets(sets, cards) {
  const size = sets[0].length;

  sets.forEach((set) => {
    if (set.length !== size) {
      throw new Error(`Sets must be the same size: ${JSON.stringify(cards)}`);
    }
  });

  return sets;
}

export function makeSets(cards) {
  return vallidateSets(cards.reduce((sets, card, idx) => {
    for (let i = 0; i < sets.length; i += 1) {
      const set = sets[i];
      if (cardsMatch(cards[set[0]], card)) {
        set.push(idx);
        return sets;
      }
    }

    sets.push([idx]);
    return sets;
  }, []), cards);
}
