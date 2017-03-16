export const spinnableCards = ['♠', '✈', '♫', '☯', '⍨'];

export default {
  title: 'Spin',
  levels: [
    { difficulty: '180°', sets: 6, setSize: 2 },
    { difficulty: '120°', sets: 5, setSize: 3 },
    { difficulty: '90°', sets: 4, setSize: 4 },
  ],
  makeCards(totalSets, setSize) {
    const cards = [];
    const rotateInc = 360 / setSize;
    let symbolIdx = 0;
    let rotateAngle = 0;

    for (let setId = 0; setId < totalSets; setId += 1) {
      for (let c = 0; c < setSize; c += 1) {
        cards.push({
          value: setId,
          symbol: spinnableCards[symbolIdx],
          style: {
            transform: `rotate(${rotateAngle}deg) translate(-50%, -50%)`,
            transformOrigin: '0% 0%',
          },
        });
      }

      rotateAngle += rotateInc;
      if (rotateAngle >= 360) {
        symbolIdx += 1;
        rotateAngle =0;
      }
    }
    return cards;
  },
};
