import modes from './';
import fibonacci from './mode.formula';
import names from './mode.names';
import colors from './mode.colors';
import tuples, { mixer } from './mode.tuples';

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

test('Mode: Names', () => {
  let sets = 3;
  let setSize = 2;
  let cards = names.makeCards(sets, setSize);

  expect(objectsMatch(cards[0], { value: '❄', symbol: '❄' })).toBe(true);
  expect(objectsMatch(cards[1], { value: '❄', symbol: 'Snowflake' })).toBe(true);
  expect(objectsMatch(cards[2], { value: '✈', symbol: '✈' })).toBe(true);
  expect(objectsMatch(cards[3], { value: '✈', symbol: 'Plane' })).toBe(true);
  expect(objectsMatch(cards[4], { value: '♠', symbol: '♠' })).toBe(true);
  expect(objectsMatch(cards[5], { value: '♠', symbol: 'Spade' })).toBe(true);

  sets = 2;
  setSize = 3;
  cards = names.makeCards(sets, setSize);

  expect(objectsMatch(cards[0], { value: '❄', symbol: '❄' })).toBe(true);
  expect(objectsMatch(cards[1], { value: '❄', symbol: 'Snowflake' })).toBe(true);
  expect(objectsMatch(cards[2], { value: '❄', symbol: '❄' })).toBe(true);
  expect(objectsMatch(cards[3], { value: '✈', symbol: '✈' })).toBe(true);
  expect(objectsMatch(cards[4], { value: '✈', symbol: 'Plane' })).toBe(true);
  expect(objectsMatch(cards[5], { value: '✈', symbol: '✈' })).toBe(true);
});

test('Mode: Colors', () => {
  const testCards = 'ABCDEFGH'.split('');
  let sets = 4;
  let setSize = 2;
  let cards = colors.makeCards(sets, setSize, testCards);

  expect(objectsMatch(cards[0], { value: 0, symbol: 'A', color: 'red' })).toBe(true);
  expect(objectsMatch(cards[1], { value: 0, symbol: 'A', color: 'red' })).toBe(true);
  expect(objectsMatch(cards[2], { value: 1, symbol: 'A', color: 'green' })).toBe(true);
  expect(objectsMatch(cards[3], { value: 1, symbol: 'A', color: 'green' })).toBe(true);
  expect(objectsMatch(cards[4], { value: 2, symbol: 'B', color: 'red' })).toBe(true);
  expect(objectsMatch(cards[5], { value: 2, symbol: 'B', color: 'red' })).toBe(true);
  expect(objectsMatch(cards[6], { value: 3, symbol: 'B', color: 'green' })).toBe(true);
  expect(objectsMatch(cards[7], { value: 3, symbol: 'B', color: 'green' })).toBe(true);

  sets = 4;
  setSize = 3;
  cards = colors.makeCards(sets, setSize, testCards);

  expect(objectsMatch(cards[0], { value: 0, symbol: 'A', color: 'red' })).toBe(true);
  expect(objectsMatch(cards[1], { value: 0, symbol: 'A', color: 'red' })).toBe(true);
  expect(objectsMatch(cards[2], { value: 0, symbol: 'A', color: 'red' })).toBe(true);
  expect(objectsMatch(cards[3], { value: 1, symbol: 'A', color: 'green' })).toBe(true);
  expect(objectsMatch(cards[4], { value: 1, symbol: 'A', color: 'green' })).toBe(true);
  expect(objectsMatch(cards[5], { value: 1, symbol: 'A', color: 'green' })).toBe(true);
  expect(objectsMatch(cards[6], { value: 2, symbol: 'A', color: 'yellow' })).toBe(true);
  expect(objectsMatch(cards[7], { value: 2, symbol: 'A', color: 'yellow' })).toBe(true);
  expect(objectsMatch(cards[8], { value: 2, symbol: 'A', color: 'yellow' })).toBe(true);
  expect(objectsMatch(cards[9], { value: 3, symbol: 'B', color: 'red' })).toBe(true);
  expect(objectsMatch(cards[10], { value: 3, symbol: 'B', color: 'red' })).toBe(true);
  expect(objectsMatch(cards[11], { value: 3, symbol: 'B', color: 'red' })).toBe(true);
});

test('Mode: Tuples (mixer)', () => {
  expect(mixer([1, 2, 3], 0).join('')).toEqual('123');
  expect(mixer([1, 2, 3], 1).join('')).toEqual('231');
  expect(mixer([1, 2, 3], 2).join('')).toEqual('312');

  expect(mixer([1, 2], 0).join('')).toEqual('12');
  expect(mixer([1, 2], 1).join('')).toEqual('21');
});

test('Mode: Tuples', () => {
  const testCards = 'ABCDEFGH'.split('');

  let sets = 5;
  let setSize = 2;
  let cards = tuples.makeCards(sets, setSize, testCards);

  // how the pattern works
  // | BA | CB , CA | DC , DB , DA | ED , EC, EB, EA |

  expect(objectsMatch(cards[0], { value: 0, symbol: 'AB' })).toBe(true);
  expect(objectsMatch(cards[1], { value: 0, symbol: 'BA' })).toBe(true);

  expect(objectsMatch(cards[2], { value: 1, symbol: 'BC' })).toBe(true);
  expect(objectsMatch(cards[3], { value: 1, symbol: 'CB' })).toBe(true);

  expect(objectsMatch(cards[4], { value: 2, symbol: 'AC' })).toBe(true);
  expect(objectsMatch(cards[5], { value: 2, symbol: 'CA' })).toBe(true);

  expect(objectsMatch(cards[6], { value: 3, symbol: 'CD' })).toBe(true);
  expect(objectsMatch(cards[7], { value: 3, symbol: 'DC' })).toBe(true);

  expect(objectsMatch(cards[8], { value: 4, symbol: 'BD' })).toBe(true);
  expect(objectsMatch(cards[9], { value: 4, symbol: 'DB' })).toBe(true);

  // how the pattern works with 3
  // | CBA | DCB , DCA | EDC , EDB , EDA | FED , FEC, FEB, FEA |
  //   210   321   320   432   431   430   543   542  541  540

  sets = 4;
  setSize = 3;
  cards = tuples.makeCards(sets, setSize, testCards);

  expect(cards.map(c => c.symbol).join('|'))
    .toEqual('ABC|BCA|CAB|BCD|CDB|DBC|ACD|CDA|DAC|CDE|DEC|ECD');
});
