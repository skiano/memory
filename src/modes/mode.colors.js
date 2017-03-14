/* eslint-disable no-return-assign, react/prop-types */
import React from 'react'

const chars = ['☯', '✈', '♠', '❄']
const colors = ['red', 'green', 'orange']

export default {
  title: 'Chromatic',
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 8 },
    { difficulty: 'Triples', sets: 6, setSize: 3 },
  ],
  makeCardFace({ setId, value, setSize, setPosition }) {
    const char = chars[Math.floor(setId / setSize)]
    const altColor = colors[setId % setSize]

    console.log(`
      card: ${value}:${setPosition}
        char: ${char}
        altColor: ${altColor}
    `)

    return (
      <div
        style={{
          fontSize: 'inherit',
          color: altColor,
        }}>
        {char}
      </div>
    )
  },
}
