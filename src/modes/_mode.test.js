import modes from './';
import fibonacci from './mode.formula';

// patch toMatchObject until jest 19 is included in kit
function objectsMatch(received, expected) {
  let pass = true;

  Object.keys(expected).forEach((key) => {
    if (expected[key] !== received[key]) {
      pass = false;
    }
  });

  if (pass) return true;

  throw new Error(`
    Objects dont match.
      expected:
        ${JSON.stringify(expected, null)}
      received:
        ${JSON.stringify(received, null)}
  `);
}

let cardTypes;

beforeEach(() => {
  /** make sure all levels work with 8 cardTypes because that's how many the api has */
  cardTypes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
});

test('Modes: valid shape', () => {
  modes.forEach((mode) => {
    expect(mode.title).toBeDefined();
    expect(mode.makeCards).toBeInstanceOf(Function);
    expect(mode.levels).toBeInstanceOf(Array);
  });
});

test('Levels: make cards with value strings', () => {
  modes.forEach(({ levels, makeCards }) => {
    levels.forEach((level) => {
      expect(level.sets).toBeGreaterThan(1);
      expect(level.setSize).toBeGreaterThan(1);
      const cards = makeCards(level.sets, level.setSize, cardTypes);
      cards.forEach(card => expect(card.value).toBeDefined());
    });
  });
});

test('Mode: Fibonacci', () => {
  let sets = 4;
  let setSize = 2;
  let cards = fibonacci.makeCards(sets, setSize);

  expect(objectsMatch(cards[0], { value: 3, symbol: '3' })).toBe(true);
  expect(objectsMatch(cards[1], { value: 3, symbol: '1+2' })).toBe(true);
  expect(objectsMatch(cards[2], { value: 5, symbol: '5' })).toBe(true);
  expect(objectsMatch(cards[3], { value: 5, symbol: '2+3' })).toBe(true);
  expect(objectsMatch(cards[4], { value: 8, symbol: '8' })).toBe(true);
  expect(objectsMatch(cards[5], { value: 8, symbol: '3+5' })).toBe(true);
  expect(objectsMatch(cards[6], { value: 13, symbol: '13' })).toBe(true);
  expect(objectsMatch(cards[7], { value: 13, symbol: '5+8' })).toBe(true);

  sets = 3;
  setSize = 3;
  cards = fibonacci.makeCards(sets, setSize);

  expect(objectsMatch(cards[0], { value: 5, symbol: '5' })).toBe(true);
  expect(objectsMatch(cards[1], { value: 5, symbol: '2+3' })).toBe(true);
  expect(objectsMatch(cards[2], { value: 5, symbol: '1+1+3' })).toBe(true);
  expect(objectsMatch(cards[3], { value: 8, symbol: '8' })).toBe(true);
  expect(objectsMatch(cards[4], { value: 8, symbol: '3+5' })).toBe(true);
  expect(objectsMatch(cards[5], { value: 8, symbol: '1+2+5' })).toBe(true);
  expect(objectsMatch(cards[6], { value: 13, symbol: '13' })).toBe(true);
  expect(objectsMatch(cards[7], { value: 13, symbol: '5+8' })).toBe(true);
  expect(objectsMatch(cards[8], { value: 13, symbol: '2+3+8' })).toBe(true);
});
