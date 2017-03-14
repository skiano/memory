import modes from './';

let baseCards;

beforeEach(() => {
  baseCards = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
});

test('Modes are constructed correctly', () => {
  modes.forEach((mode) => {
    expect(mode.title).toBeDefined();
    expect(mode.makeCards).toBeInstanceOf(Function);
    expect(mode.levels).toBeInstanceOf(Array);
  });
});

test('Levels can make cards', () => {
  modes.forEach(({ levels, makeCards }) => {
    levels.forEach((level) => {
      expect(level.sets).toBeGreaterThan(1);
      expect(level.setSize).toBeGreaterThan(1);
      const cards = makeCards(level.sets, level.setSize, baseCards);
    });
  });
});
