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

test('getSizes: prefer to enlarge cards and keep gutter', () => {
  const outerSide = 870
  const cardCount = 8
  const idealGutter = 10
  const minCardSize = 20
  const { cardSize, gutterSize } = layout.getSizes(
    outerSide, cardCount, idealGutter, minCardSize
  )

  expect(cardSize).toEqual(100)
  expect(gutterSize).toEqual(10)
})

test('getSizes: shrink gutter to keep min card size', () => {
  const outerSide = 520
  const cardCount = 5
  const idealGutter = 10
  const minCardSize = 100
  const { cardSize, gutterSize } = layout.getSizes(
    outerSide, cardCount, idealGutter, minCardSize
  )

  expect(cardSize).toEqual(100)
  expect(gutterSize).toEqual(5)
})

test('getPxDimensions', () => {
  const dimensions = [3, 4]
  const cardSize = 100
  const gutterSize = 20
  const pxDimensions = layout.getPxDimensions(
    dimensions, cardSize, gutterSize
  )

  expect(pxDimensions[0]).toEqual(340)
  expect(pxDimensions[1]).toEqual(460)
})

test('getPosition', () => {
  const card = 100
  const gutter = 20
  expect(layout.getPosition(0, card, gutter)).toEqual(0)
  expect(layout.getPosition(1, card, gutter)).toEqual(120)
  expect(layout.getPosition(2, card, gutter)).toEqual(240)
})
