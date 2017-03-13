/*
 * I was using immutable.js
 * but in the end it seemed like a lot
 * more than i needed. Plus
 * I felt i needed to research more about
 * how it relates to redux.
 * This is a small set of utilities to accomplish what
 * i was using from immutable
 */

export const add = (arr, v) => ([...arr, v])
export const addUnique = (arr, v) => (arr.includes(v) ? arr : add(arr, v))

export const update = (arr, idx, fn) => {
  const n = [...arr]
  n.splice(idx, 1, fn(n[idx]))
  return n
}

export const remove = (arr, v) => {
  if (!arr.includes(v)) return arr
  const n = [...arr]
  n.splice(arr.indexOf(v), 1)
  return n
}

export const unique = arr => arr.reduce((a, v) => {
  if (a.includes(v)) return a
  a.push(v)
  return a
}, [])

