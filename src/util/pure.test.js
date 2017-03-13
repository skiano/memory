import * as pure from './pure'

let input

beforeEach(() => {
  input = ['a', 'b', 'c', 'd']
})

test('Pure Add', () => {
  const output = pure.add(input, 'e')
  expect(input.join('')).toBe('abcd')
  expect(output.join('')).toBe('abcde')
})

test('Pure Remove', () => {
  const output = pure.remove(input, 'b')
  expect(input.join('')).toBe('abcd')
  expect(output.join('')).toBe('acd')
})

test('Pure Remove (if missing)', () => {
  const output = pure.remove(input, 'f')
  expect(output).toBe(input)
})

test('Pure Add Unique', () => {
  const noop = pure.addUnique(input, 'b')
  expect(input.join('')).toBe('abcd')
  expect(noop).toBe(input)

  const output = pure.addUnique(input, 'e')
  expect(input.join('')).toBe('abcd')
  expect(output.join('')).toBe('abcde')
})

test('Pure update', () => {
  const output = pure.update(input, 1, v => v.toUpperCase())
  expect(input.join('')).toBe('abcd')
  expect(output.join('')).toBe('aBcd')
})

test('Pure update', () => {
  const output = pure.unique(['a', 'a', 'b', 'c', 'c'])
  expect(output.join('')).toBe('abc')
})
