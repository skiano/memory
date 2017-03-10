import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Home from '../Home/Home'
import Game from '../Game/Game'

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/play" component={Game} />
  </Router>
)

export default App
