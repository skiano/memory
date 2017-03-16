/* eslint-disable no-return-assign */
/** cache all the results */
const formulaOffsets = [[-2, -1], [-4, -3, -1]];
const fibCache = {};

const fib = (n, memo = {}) => (memo[n] || (
  (n < 2) ? ((memo[n] = n) && n) :
  ((memo[n] = fib(n - 1, memo) + fib(n - 2), memo) && memo[n])
));

const getFormula = (n, setPosition) => (
  formulaOffsets[setPosition - 1].slice(0, setPosition + 1).map(i => fib(n + i)).join('+')
);

const getFontSize = symbol => (1 / Math.pow(symbol.length, 0.6));

export default {
  title: 'Fibonacci',
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 8 },
    { difficulty: 'Insane', sets: 6, setSize: 3 },
  ],
  makeCards({ sets, setSize }) {
    const cards = [];
    for (let setId = 0; setId < sets; setId += 1) {
      // make sure there are enough smaller numbers in the series
      const n = setId + setSize + 2;
      const value = fib(n, fibCache);

      cards.push({
        value,
        symbol: `${value}`,
        style: {
          fontSize: `${getFontSize(`${value}`)}em`,
        },
      });

      for (let c = 1; c < setSize; c += 1) {
        const symbol = getFormula(n, c);
        cards.push({
          value,
          symbol,
          style: {
            fontSize: `${getFontSize(symbol)}em`,
          },
        });
      }
    }
    return cards;
  },
};
