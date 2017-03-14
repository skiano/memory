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
  makeCards(totalSets, setSize) {
    const cards = [];
    for (let setId = 0; setId < totalSets; setId += 1) {
      const symbol = symbols[setId];
      if (!symbol) {
        throw new Error(`namesCardMaker() needed ${symbols} symbols`);
      }

      for (let c = 0; c < setSize; c += 1) {
        cards.push({
          value: symbol[0],
          symbol: symbol[c % 2],
        });
      }
    }
    return cards;
  },
};
