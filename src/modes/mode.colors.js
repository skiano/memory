const colors = [
  'red',
  'green',
  'white',
];

export default {
  title: 'Chromatic',
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 8 },
    { difficulty: 'Triples', sets: 8, setSize: 3 },
  ],
  makeCards(totalSets, setSize, cardTypes) {
    const cards = [];
    const pallette = colors.slice(0, setSize);

    let symbolIdx = 0;
    let colorIdx = 0;

    for (let setId = 0; setId < totalSets; setId += 1) {
      for (let c = 0; c < setSize; c += 1) {
        cards.push({
          value: setId,
          symbol: cardTypes[symbolIdx],
          color: pallette[colorIdx],
          style: {
            color: pallette[colorIdx],
          },
        });
      }

      colorIdx += 1;
      if (colorIdx > pallette.length - 1) {
        colorIdx = 0;
        symbolIdx += 1;
      }
    }
    return cards;
  },
};
