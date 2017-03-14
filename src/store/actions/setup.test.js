import { setupModes } from './setup';

let dispatch;
let cardTypes;

beforeEach(() => {
  dispatch = jest.fn();
  cardTypes = ['A', 'B', 'C'];
});

test('Setup Modes', () => {
  const modes = [
    {
      title: 'Mode 1',
      slug: 'mode-1',
      makeCards: (sets, size) => [sets, size],
      levels: [
        { difficulty: 'easy', slug: 'e', sets: 4, setSize: 2 },
        { difficulty: 'hard', slug: 'h', sets: 8, setSize: 3 },
      ],
    },
    {
      title: 'Mode 2',
      slug: 'mode-2',
      makeCards: (sets, size, types) => types,
      levels: [
        { difficulty: 'easy', slug: 'e', sets: 2, setSize: 2 },
        { difficulty: 'hard', slug: 'h', sets: 8, setSize: 3 },
      ],
    },
  ];

  setupModes(modes, cardTypes)(dispatch);

  /* were the modes setup correctly */
  const firstAction = dispatch.mock.calls[0][0];
  const finalModes = firstAction.payload.modes;
  expect(firstAction.type).toEqual('SET_CONFIG');

  expect(finalModes[0].title).toEqual('Mode 1');
  expect(finalModes[0].slug).toEqual('mode-1');
  expect(finalModes[0].levels.join()).toEqual('0,1');

  expect(finalModes[1].title).toEqual('Mode 2');
  expect(finalModes[1].slug).toEqual('mode-2');
  expect(finalModes[1].levels.join()).toEqual('2,3');

  /* were the levels setup correctly */
  const secondAction = dispatch.mock.calls[1][0];
  const finalLevels = secondAction.payload.levels;
  expect(secondAction.type).toEqual('SET_CONFIG');

  expect(finalLevels[0].difficulty).toEqual('easy');
  expect(finalLevels[0].slug).toEqual('e');
  expect(finalLevels[0].modeId).toEqual(0);
  expect(finalLevels[0].cards.join()).toEqual('4,2');

  expect(finalLevels[1].difficulty).toEqual('hard');
  expect(finalLevels[1].slug).toEqual('h');
  expect(finalLevels[1].modeId).toEqual(0);
  expect(finalLevels[1].cards.join()).toEqual('8,3');

  expect(finalLevels[2].difficulty).toEqual('easy');
  expect(finalLevels[2].slug).toEqual('e');
  expect(finalLevels[2].modeId).toEqual(1);
  expect(finalLevels[2].cards.join()).toEqual('A,B,C');

  expect(finalLevels[3].difficulty).toEqual('hard');
  expect(finalLevels[3].slug).toEqual('h');
  expect(finalLevels[3].modeId).toEqual(1);
  expect(finalLevels[3].cards.join()).toEqual('A,B,C');
});
