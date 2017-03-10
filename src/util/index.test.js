import { purePush, pureRemove } from './index'

test('push is pure', () => {
  const input = { key: [0, 1, 2] }
  const output = purePush(input, 'key', 3)

  expect(input.key.join('')).toEqual('012')
  expect(output.key.join('')).toEqual('0123')
  expect(output).not.toBe(input)
  expect(output.key).not.toBe(input.key)
})

test('remove is pure', () => {
  const input = { key: ['a', 'b', 'c'] }
  const output = pureRemove(input, 'key', 'b')

  expect(input.key.join('')).toEqual('abc')
  expect(output.key.join('')).toEqual('ac')
  expect(output).not.toBe(input)
  expect(output.key).not.toBe(input.key)
})
