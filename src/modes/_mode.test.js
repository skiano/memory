import modes from './';

let baseCards;

beforeEach(() => {
  baseCards = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
});

test('Modes are constructed correctly', () => {
  modes.forEach((mode) => {
    console.log(baseCards);

    expect(mode).toBe(expect.objectContaining({
      title: expect.any(String),
      slug: expect.any(String),
      makeCards: expect.any(Function),
      levels: expect.any(Array),
    }));
  });
});
