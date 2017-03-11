import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
import stateReducer from './stateReducer'

export default () => createStore(
  stateReducer,
  applyMiddleware(
    thunkMiddleware,
    // createLogger()
  )
)
