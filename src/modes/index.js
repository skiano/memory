import slugify from 'slugify'

const gameModes = [
  {
    title: 'Classic',
    levels: [
      { difficulty: 'easy', sets: 4 },
      { difficulty: 'hard', sets: 8 },
      { difficulty: 'tripples', sets: 8, setSize: 3 },
    ],
  },
  {
    title: 'Mirrored',
    levels: [
      { difficulty: 'easy', sets: 4 },
      { difficulty: 'hard', sets: 8 },
    ],
  },
  {
    title: 'Names',
    levels: [
      { difficulty: 'easy', sets: 4 },
      { difficulty: 'hard', sets: 8 },
    ],
  },
  {
    title: 'Double Trouble',
    levels: [
      { difficulty: 'easy', sets: 4 },
      { difficulty: 'hard', sets: 8 },
    ],
  },
  {
    title: 'Formula',
    levels: [
      { difficulty: 'easy', sets: 4 },
      { difficulty: 'hard', sets: 8 },
    ],
  },
  {
    title: 'Colors',
    levels: [
      { difficulty: 'easy', sets: 4 },
      { difficulty: 'hard', sets: 8 },
      { difficulty: 'tripples', sets: 4, setSize: 3 },
    ],
  },
].map(mode => Object.assign({
  slug: slugify(mode.title.toLowerCase()),
}, mode))

export default gameModes
