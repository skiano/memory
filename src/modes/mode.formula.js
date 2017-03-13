/* eslint-disable no-return-assign, react/prop-types */
import React from 'react'

const fib = (n, memo = {}) => (memo[n] || (
  (n < 2) ? ((memo[n] = n) && n) :
  ((memo[n] = fib(n - 1, memo) + fib(n - 2), memo) && memo[n])
))

const getFormula = (n, setPosition) => (
  [
    [-1, -2],
    [-1, -3, -4],
  ][setPosition - 1].slice(0, setPosition + 1).map(i => fib(n + i)).join('+')
)

export default {
  title: 'Fibonacci',
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 6 },
    { difficulty: 'Insane', sets: 4, setSize: 3 },
  ],
  makeCardFace({ setId, setSize, setPosition }) {
    const n = setId + setSize + 1
    const total = fib(n)
    const text = (setPosition > 0) ? getFormula(n, setPosition) : total
    return (<div style={{ fontSize: '20px' }}>{text}</div>)
  },
}
