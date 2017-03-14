/* eslint-disable import/prefer-default-export */

export function wait() {
  // Jest mock timers are not working as expected
  // when a setTimeout dispatches more actions in redux
  // so this is a workaround until i have time to dig into that
  return { then: cb => cb() };
}
