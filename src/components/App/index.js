import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

import Home from '../Home/Home'
import Game from '../Game/SmartGame'
import createStore from '../../store'

const App = () => (
  <Provider store={createStore()}>
    <Router history={hashHistory}>
      <Route path="/" component={Home} />
      <Route path="/play" component={Game} />
    </Router>
  </Provider>
)

export default App
