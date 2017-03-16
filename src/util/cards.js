export const defaultCardMaker = (level, cardTypes) => {
  const totalSets = level.sets;
  const setSize = level.setSize;
  const cards = [];
  let setId;
  for (setId = 0; setId < totalSets; setId += 1) {
    const symbol = cardTypes[setId];

    if (!symbol) {
      throw new Error(`
        defaultCardMaker()
          needed ${totalSets} card types
          recieved: ${cardTypes.join()}
      `);
    }

    let c;
    for (c = 0; c < setSize; c += 1) {
      cards.push({ value: symbol, symbol });
    }
  }
  return cards;
};

function cardsMatch(a, b) {
  if (typeof a === 'string' || typeof a === 'number') {
    return a === b;
  }
  return a.value === b.value;
}

function vallidateSets(sets, cards) {
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
