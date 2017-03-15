/* eslint-disable no-plusplus */

/*
 * Sample of how this pattern works with sets of 2
 * symbols =>  | BA | CB , CA | DC , DB , DA | ED , EC, EB, EA |
 * indexes =>    10   21   20   32   31   30   43   42  41  40
 */

export const mixer = (symbols, cardIdx) => (
  symbols.slice(cardIdx).concat(symbols.slice(0, cardIdx))
);

export default {
  title: 'Double Trouble',
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 8 },
  ],
  makeCards(totalSets, setSize, cardTypes) {
    const cards = [];
    const range = cardTypes.map((c, i) => i);

    let rangeStart = 0;
    let symbolIdxs = [...range].splice(rangeStart, setSize);
    for (let setId = 0; setId < totalSets; setId += 1) {
      const symbols = symbolIdxs.map(i => cardTypes[i]);

      for (let c = 0; c < setSize; c += 1) {
        cards.push({
          value: setId,
          symbol: mixer(symbols, c).join(''),
        });
      }

      /** update symbold indexes */
      if (symbolIdxs[0] === 0) {
        symbolIdxs = [...range].splice(++rangeStart, setSize);
      } else {
        symbolIdxs[0] -= 1;
      }
    }

    return cards;
  },
};
