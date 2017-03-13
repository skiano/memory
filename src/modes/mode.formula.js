/* eslint-disable react/prop-types */
import React from 'react'

/* eslint-disable no-return-assign */
const fib = (n, memo = {}) => (memo[n] || (
  (n < 2) ? ((memo[n] = n) && n) :
  ((memo[n] = fib(n - 1, memo) + fib(n - 2), memo) && memo[n])
))
/* eslint-enable no-return-assign */

// for (let i = 1; i <= 9; i += 1) {
//   console.log(`${i} => ${fib(i)}`)
// }

export default {
  title: 'Formula',
  makeCardFace({ setId, setPosition }) {
    const total = fib(setId + 3)

    return (
      <span style={{ fontSize: '20px' }}>{total}:{setId + 3}</span>
    )
  },
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 6 },
  ],
}
