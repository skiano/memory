import { defaultCardMaker } from '../util';

// { difficulty: 'Mahjong Tiles', dictionary: ['\uD83D\uDCA9', '\uD835\uDC00'], sets: 2 },


const extraModes = [
  {
    title: 'Games',
    levels: [
      {
        difficulty: 'Mahjong',
        dictionary: [
          '\ud83c\udc10',
          '\ud83c\udc1e',
          '\ud83c\udc1f',
          '\ud83c\udc21',
          '\ud83c\udc22',
          '\ud83c\udc23',
          '\ud83c\udc24',
          '\ud83c\udc25',
          '\ud83c\udc26',
          '\ud83c\udc27',
          '\ud83c\udc28',
          '\ud83c\udc29',
        ],
      },
      {
        difficulty: 'Dominos',
        dictionary: [
          '\ud83c\udc70',
          '\ud83c\udc72',
          '\ud83c\udc74',
          '\ud83c\udc76',
          '\ud83c\udc77',
          '\ud83c\udc78',
          '\ud83c\udc80',
          '\ud83c\udc82',
        ],
      },
      {
        difficulty: 'Poker',
        dictionary: [
          // spades
          '\ud83c\udcab',
          '\ud83c\udcad',
          '\ud83c\udcae',
          // hearts
          '\ud83c\udcbb',
          '\ud83c\udcbd',
          '\ud83c\udcbe',
          // diamonds
          '\ud83c\udccb',
          '\ud83c\udccd',
          '\ud83c\udcce',
          // clubs
          '\ud83c\udcdb',
          '\ud83c\udcdd',
          '\ud83c\udcde',
        ],
      },
    ],
  },
  // {
  //   title: 'Languages',
  //   levels: [
  //     {
  //       difficulty: 'Braille',
  //       dictionary: [
  //         '\u2839',
  //         '\u283a',
  //         '\u283b',
  //         '\u2833',
  //         '\u282e',
  //         '\u282b',
  //       ],
  //     },
  //     {
  //       difficulty: 'Cuneiform',
  //       dictionary: [
  //         '\ud808\udc48',
  //         '\ud808\udc42',
  //         '\ud808\udc49',
  //         '\ud808\udc4c',
  //         '\ud808\udc3e',
  //         '\ud808\udc3c',
  //       ],
  //     },
  //   ],
  // },
].map(({ title, levels }) => ({
  title,
  levels,
  makeCards({ setSize, dictionary }) {
    const cardTypes = Array.isArray(dictionary) ? dictionary : dictionary.split('');
    return defaultCardMaker({
      sets: dictionary.length,
      setSize,
    }, cardTypes).map(card => Object.assign({
      style: {
        fontSize: '1.1em',
      },
    }, card));
  },
}));

export default extraModes;
