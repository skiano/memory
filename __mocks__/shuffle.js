/* eslint-disable import/prefer-default-export */

/*
 * Mocking shuffle to take randomness out of the equation
 * in tests the arrays will just be reversed
 */
export function shuffle(arr) {
  return [...arr].reverse();
}
