import * as layout from './layout'

test('getGridSize: returns closet to square', () => {
  expect(layout.getGridSize(9).join()).toEqual('3,3')
  expect(layout.getGridSize(12).join()).toEqual('4,3')
  expect(layout.getGridSize(14).join()).toEqual('7,2')
  expect(layout.getGridSize(24).join()).toEqual('6,4')
})

test('getGridSize: throws on non-even numbers', () => {
  expect(() => {
    layout.getGridSize(1).join()
  }).toThrowError(/Bad card count: 1/)

  expect(() => {
    layout.getGridSize(7).join()
  }).toThrowError(/Bad card count: 7/)
})
