/* eslint-disable no-return-assign, react/prop-types */
import React from 'react'

const fib = (n, memo = {}) => (memo[n] || (
  (n < 2) ? ((memo[n] = n) && n) :
  ((memo[n] = fib(n - 1, memo) + fib(n - 2), memo) && memo[n])
))

const getFormula = n => `${fib(n - 2)} + ${fib(n - 1)}`

export default {
  title: 'Fibonacci',
  makeCardFace({ setId, setPosition }) {
    const n = setId + 3
    const total = fib(n)
    const text = (setPosition > 0) ? getFormula(n) : total
    return (<div style={{ fontSize: '20px' }}>{text}</div>)
  },
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 6 },
  ],
}
