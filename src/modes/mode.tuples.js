/* eslint-disable no-plusplus */

/*
 * Sample of how this pattern works with sets of 2
 * symbols =>  | BA | CB , CA | DC , DB , DA | ED , EC, EB, EA |
 * indexes =>    10   21   20   32   31   30   43   42  41  40
 */

export const mixer = (symbols, cardIdx) => (
  symbols.slice(cardIdx).concat(symbols.slice(0, cardIdx))
);

const getFontSize = symbol => (1 / symbol.length);

export default {
  title: 'Twisted',
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 8 },
    { difficulty: 'Demented', sets: 5, setSize: 3 },
  ],
  makeCards({ sets, setSize }, cardTypes) {
    const cards = [];
    const range = cardTypes.map((c, i) => i);

    let rangeStart = 0;
    let symbolIdxs = [...range].splice(rangeStart, setSize);
    for (let setId = 0; setId < sets; setId += 1) {
      const symbols = symbolIdxs.map(i => cardTypes[i]);

      for (let c = 0; c < setSize; c += 1) {
        const text = mixer(symbols, c).join('');
        cards.push({
          value: setId,
          symbol: text,
          style: {
            fontSize: `${getFontSize(`${text}`)}em`,
            whiteSpace: 'nowrap',
            letterSpacing: '.1em',
          },
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
