import { getPoints, getPointsFromGuess, TOTAL_POINTS } from './scoreKeeper';

test('scoreKeeper: lucky guess', () => {
  /** first time you any of the cards */
  expect(getPoints([1, 1])).toEqual(TOTAL_POINTS * 2);
  expect(getPoints([1, 1, 1])).toEqual(TOTAL_POINTS * 3);
});

test('scoreKeeper: Perfect memory', () => {
  /** you only saw the cards once before (just as good as pure luck) */
  expect(getPoints([2, 2])).toEqual(TOTAL_POINTS * 2);
  expect(getPoints([2, 2, 2])).toEqual(TOTAL_POINTS * 3);
});

test('scoreKeeper: dropoff', () => {
  /** you only saw the cards once before (just as good as pure luck) */
  expect(getPoints([3])).toEqual(TOTAL_POINTS - 2);
  expect(getPoints([4])).toEqual(TOTAL_POINTS - 4);
  expect(getPoints([5])).toEqual(TOTAL_POINTS - 6);
  expect(getPoints([1000])).toEqual(0);
});

test('getPointsFromGuess', () => {
  //                                            |     |  |
  const points = getPointsFromGuess([0, 2, 3], [2, 4, 2, 2, 3]);
  expect(points).toEqual(TOTAL_POINTS * 3);
});
