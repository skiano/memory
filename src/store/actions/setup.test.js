import { setupModes, setupGame } from './setup';

let dispatch;
let cardTypes;

beforeEach(() => {
  dispatch = jest.fn();
  cardTypes = ['A', 'B', 'C'];
});

test('Setup Game', () => {
  const levelId = 0;
  const testState = {
    config: {
      levels: [
        {
          cards: ['A', 'A', 'B', 'B', 'C', 'C'],
        },
      ],
    },
  };
  setupGame(levelId)(dispatch, () => testState);

  const createGame = dispatch.mock.calls[dispatch.mock.calls.length - 1][0];
  const { payload } = createGame;
  expect(createGame.type).toEqual('CREATE_GAME');
  expect(payload.cards.join('')).toEqual('CCBBAA');
  expect(payload.seen.join('')).toEqual('000000');
  expect(payload.sets.map(s => s.join()).join('|')).toEqual('0,1|2,3|4,5');
});

test('Setup Game: pass cards', () => {
  const testState = {};
  setupGame(['A', 'A', 'B', 'B', 'C', 'C'])(dispatch, () => testState);

  const createGame = dispatch.mock.calls[dispatch.mock.calls.length - 1][0];
  const { payload } = createGame;
  expect(createGame.type).toEqual('CREATE_GAME');
  expect(payload.cards.join('')).toEqual('AABBCC');
  expect(payload.seen.join('')).toEqual('000000');
  expect(payload.sets.map(s => s.join()).join('|')).toEqual('0,1|2,3|4,5');
});

test('Setup Modes', () => {
  const modeConfig = [
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

  setupModes(modeConfig, cardTypes)(dispatch);

  /* were the modes setup correctly */
  const firstAction = dispatch.mock.calls[0][0];
  const { modes } = firstAction.payload;
  expect(firstAction.type).toEqual('SET_CONFIG');

  expect(modes[0].title).toEqual('Mode 1');
  expect(modes[0].slug).toEqual('mode-1');
  expect(modes[0].levels.join()).toEqual('0,1');

  expect(modes[1].title).toEqual('Mode 2');
  expect(modes[1].slug).toEqual('mode-2');
  expect(modes[1].levels.join()).toEqual('2,3');

  /* were the levels setup correctly */
  const secondAction = dispatch.mock.calls[1][0];
  const { levels } = secondAction.payload;
  expect(secondAction.type).toEqual('SET_CONFIG');

  expect(levels[0].difficulty).toEqual('easy');
  expect(levels[0].slug).toEqual('e');
  expect(levels[0].modeId).toEqual(0);
  expect(levels[0].cards.join()).toEqual('4,2');

  expect(levels[1].difficulty).toEqual('hard');
  expect(levels[1].slug).toEqual('h');
  expect(levels[1].modeId).toEqual(0);
  expect(levels[1].cards.join()).toEqual('8,3');

  expect(levels[2].difficulty).toEqual('easy');
  expect(levels[2].slug).toEqual('e');
  expect(levels[2].modeId).toEqual(1);
  expect(levels[2].cards.join()).toEqual('A,B,C');

  expect(levels[3].difficulty).toEqual('hard');
  expect(levels[3].slug).toEqual('h');
  expect(levels[3].modeId).toEqual(1);
  expect(levels[3].cards.join()).toEqual('A,B,C');

  /* were the slug map setup correctly */
  const thirdAction = dispatch.mock.calls[2][0];
  const { slugMap } = thirdAction.payload;
  expect(thirdAction.type).toEqual('SET_CONFIG');

  expect(slugMap['mode-1'].id).toEqual(0);
  expect(slugMap['mode-1'].levels.e).toEqual(0);
  expect(slugMap['mode-1'].levels.h).toEqual(1);

  expect(slugMap['mode-2'].id).toEqual(1);
  expect(slugMap['mode-2'].levels.e).toEqual(2);
  expect(slugMap['mode-2'].levels.h).toEqual(3);
});
