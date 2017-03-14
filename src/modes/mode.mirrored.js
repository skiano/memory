/* eslint-disable no-return-assign, react/prop-types */
import React from 'react'
import classNames from 'classnames'
import styles from '../components/Card/Card.scss'

const flippable = ['♠', '♫', '♘', '☆']
const remmaper = [0, 0, 1, 1, 2, 2]

export default {
  title: 'Spin',
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 8 },
  ],
  makeCardFace({ setId }) {
    // make two sets using the same set, but one is the reflection of the other

    const char = flippable[setId ]
    const mirrored = setId % 2 === 0

    return (
      <div
        style={{ fontSize: 'inherit' }}
        className={classNames({ [styles.mirrored]: mirrored })}>
        {char}
      </div>
    )
  },
}
