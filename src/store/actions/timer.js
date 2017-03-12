import {
  tick,
} from './'

let interval

export const startTimer = () => (
  (dispatch) => {
    interval = setInterval(() => dispatch(tick()), 1000)
  }
)

export const stopTimer = () => (() => clearInterval(interval))
