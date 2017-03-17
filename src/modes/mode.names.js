const symbols = [
  ['❄', 'Snowflake'],
  ['✈', 'Plane'],
  ['♠', 'Spade'],
  ['☆', 'Star'],
  ['♘', 'Knight'],
  ['☯', 'Yin Yang'],
  ['⍨', 'Emoticon'],
  ['♫', 'Music'],
];

export default {
  title: 'Namicon',
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 8 },
    { difficulty: 'Quad', sets: 5, setSize: 4 },
  ],
  makeCards({ sets, setSize }) {
    const cards = [];
    for (let setId = 0; setId < sets; setId += 1) {
      const symbol = symbols[setId];
      if (!symbol) {
        throw new Error(`namesCardMaker() needed ${symbols} symbols`);
      }

      for (let c = 0; c < setSize; c += 1) {
        const isName = c % 2;
        cards.push({
          value: symbol[0],
          symbol: symbol[isName ? 1 : 0],
          style: {
            fontSize: isName ? '0.28em' : '1em',
            fontWeight: isName ? 'bold' : 'normal',
          },
        });
      }
    }
    return cards;
  },
};
