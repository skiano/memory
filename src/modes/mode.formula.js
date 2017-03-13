/* eslint-disable react/prop-types */
import React from 'react'

export default {
  title: 'Formula',
  makeCardFace({ value, setId, setPosition }) {

    return (
      <span>{setId}:{setPosition}</span>
    )
  },
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 8 },
  ],
}
