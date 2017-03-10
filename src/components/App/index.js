import React from 'react'
import { Router, Route, hashHistory } from 'react-router'

import Home from '../Home/Home'
import Game from '../Game/Game'
import * as store from '../../store'

console.log(store)

const App = () => (
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/play" component={Game} />
  </Router>
)

export default App
