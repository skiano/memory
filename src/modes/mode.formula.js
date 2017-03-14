/* eslint-disable no-return-assign */
/** cache all the results */
const fibCache = {};

const fib = (n, memo = {}) => (memo[n] || (
  (n < 2) ? ((memo[n] = n) && n) :
  ((memo[n] = fib(n - 1, memo) + fib(n - 2), memo) && memo[n])
));

const getFormula = (n, setPosition) => (
  [
    [-2, -1],
    [-4, -3, -1],
  ][setPosition - 1].slice(0, setPosition + 1).map(i => fib(n + i)).join('+')
);

export default {
  title: 'Fibonacci',
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 8 },
    { difficulty: 'Insane', sets: 6, setSize: 3 },
  ],
  makeCards(totalSets, setSize) {
    const cards = [];
    for (let setId = 0; setId < totalSets; setId += 1) {
      // make sure there are enough smaller numbers in the series
      const n = setId + setSize + 2;
      const value = fib(n, fibCache);

      cards.push({
        value,
        symbol: `${value}`,
      });

      for (let c = 1; c < setSize; c += 1) {
        cards.push({
          value,
          symbol: getFormula(n, c),
        });
      }
    }
    return cards;
  },
};
