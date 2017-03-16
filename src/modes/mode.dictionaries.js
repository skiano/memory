import { defaultCardMaker } from '../util';

// { difficulty: 'Mahjong Tiles', dictionary: ['\uD83D\uDCA9', '\uD835\uDC00'], sets: 2 },


const extraModes = [
  {
    title: 'Games',
    levels: [
      {
        difficulty: 'Mahjong Tiles',
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
      { difficulty: 'Alphabet 1', dictionary: 'ABCDEFGHI', sets: 6 },
    ],
  },
].map(({ title, levels }) => ({
  title,
  levels,
  makeCards({ setSize, dictionary }) {
    const cardTypes = Array.isArray(dictionary) ? dictionary : dictionary.split('');
    return defaultCardMaker({ sets: dictionary.length, setSize }, cardTypes);
  },
}));

export default extraModes;
