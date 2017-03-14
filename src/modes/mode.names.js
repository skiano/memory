/* eslint-disable no-return-assign, react/prop-types */
import React from 'react';

const symbols = {
  '❄': 'Snowflake',
  '⍨': 'Emoticon',
  '♘': 'Knight',
  '✈': 'Plane',
  '☯': 'Yin Yang',
  '♠': 'Spade',
  '☆': 'Star',
  '♫': 'Music',
};


export default {
  title: 'Namicon',
  levels: [
    { difficulty: 'Easy', sets: 4 },
    { difficulty: 'Hard', sets: 8 },
    { difficulty: 'Quad', sets: 5, setSize: 4 },
  ],
  makeCardFace({ value, setPosition }) {
    if (!symbols[value]) {
      throw new Error(`
        Unknown symbol: ${value}
      `);
    }

    return (setPosition % 2 === 0) ? (
      <div style={{ fontSize: 'inherit' }}>{value}</div>
    ) : (
      <div style={{ fontSize: '20px' }}>{symbols[value]}</div>
    );
  },
};
