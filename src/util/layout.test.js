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

test.only('getLayout', () => {
  const cardCount = 9
  const tableSize = [400, 340]
  const gutterSize = 20
  const minCardSize = 0

  const { positions } = layout.getLayout(
    cardCount, tableSize, gutterSize, minCardSize
  )

  /* eslint-disable no-multi-spaces */
  const expectedPositions = [
    [30,   0], [150,   0], [270,   0],
    [30, 120], [150, 120], [270, 120],
    [30, 240], [150, 240], [270, 240],
  ]
  /* eslint-enable no-multi-spaces */

  expectedPositions.forEach((p, i) => {
    expect(positions[i][0]).toEqual(p[0])
    expect(positions[i][1]).toEqual(p[1])
  })
})

test.only('getLayout: supports rectangle', () => {
  const cardCount = 6
  const tableSize = [340, 340]
  const gutterSize = 20
  const minCardSize = 0
  const { positions } = layout.getLayout(
    cardCount, tableSize, gutterSize, minCardSize
  )

  /* eslint-disable no-multi-spaces */
  const expectedPositions = [
    [0,  60], [120,  60], [240,  60],
    [0, 180], [120, 180], [240, 180],
  ]
  /* eslint-enable no-multi-spaces */

  expectedPositions.forEach((p, i) => {
    expect(positions[i][0]).toEqual(p[0])
    expect(positions[i][1]).toEqual(p[1])
  })
})

test.only('getLayout: chooses best orientation for rectangle', () => {
  const cardCount = 6
  const tableSize = [220, 340]
  const gutterSize = 20
  const minCardSize = 0
  const { positions } = layout.getLayout(
    cardCount, tableSize, gutterSize, minCardSize
  )

  /* eslint-disable no-multi-spaces */
  const expectedPositions = [
    [0,   0], [120,   0],
    [0, 120], [120, 120],
    [0, 240], [120, 240],
  ]
  /* eslint-enable no-multi-spaces */

  expectedPositions.forEach((p, i) => {
    expect(positions[i][0]).toEqual(p[0])
    expect(positions[i][1]).toEqual(p[1])
  })
})
