import {
  defaultCardMaker,
  makeSets,
} from './cards';

let cardTypes;

beforeEach(() => {
  cardTypes = [1, 2, 3, 4, 5, 6, 7, 8];
});

test('Making default cards', () => {
  const sets = 4;
  const setSize = 2;
  const cards = defaultCardMaker(sets, setSize, cardTypes);
  expect(cards.map(c => c.value).join())
    .toEqual('1,1,2,2,3,3,4,4');
});

test('Making default cards with big sets', () => {
  const sets = 2;
  const setSize = 4;
  const cards = defaultCardMaker(sets, setSize, cardTypes);
  expect(cards.map(c => c.value).join())
    .toEqual('1,1,1,1,2,2,2,2');
});

test('Making default cards throws when it can’t make sets', () => {
  const sets = 12;
  const setSize = 2;
  expect(() => {
    defaultCardMaker(sets, setSize, cardTypes);
  }).toThrowError(/needed 12 card types/);
});

test('makeSets: strings', () => {
  expect(makeSets([
    'a', 'b', 'c',
    'a', 'b', 'c',
  ]).map(set => set.join()).join('|'))
    .toEqual('0,3|1,4|2,5');
});

test('makeSets: numbers', () => {
  expect(makeSets([
    1, 2, 3,
    1, 2, 3,
  ]).map(set => set.join()).join('|'))
    .toEqual('0,3|1,4|2,5');
});

test('makeSets: objects', () => {
  expect(makeSets([
    { value: 'a' }, { value: 'b' }, { value: 'c' },
    { value: 'a' }, { value: 'b' }, { value: 'c' },
  ]).map(set => set.join()).join('|'))
    .toEqual('0,3|1,4|2,5');
});

test('makeSets: validation', () => {
  expect(() => {
    makeSets([
      1, 2, 3,
      1, 2,
    ]);
  }).toThrowError(/Sets must be the same size/);
});

