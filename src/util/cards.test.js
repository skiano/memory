import { defaultCardMaker } from './cards';

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
