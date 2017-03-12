import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

import Shell from '../Shell/SmartShell'
import Home from '../Home/Home'
import Game from '../Game/SmartGame'
import createStore from '../../store'

const App = () => (
  <Provider store={createStore()}>
    <Shell>
      <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/play/:mode/:difficulty" component={Game} />
      </Router>
    </Shell>
  </Provider>
)

export default App
