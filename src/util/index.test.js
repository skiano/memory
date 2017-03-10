import { pureRemove } from './index'

test('remove is pure', () => {
  const input = ['a', 'b', 'c']
  const output = pureRemove(input, 'b')

  expect(input.join('')).toEqual('abc')
  expect(output.join('')).toEqual('ac')
  expect(output).not.toBe(input)
})
