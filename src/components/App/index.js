import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import Shell from '../Shell/Shell.Smart';
import Home from '../Home/Home.Smart';
import Game from '../Game/Game.Smart';
import createStore from '../../store';

const App = () => (
  <Provider store={createStore()}>
    <Shell>
      <Router history={hashHistory}>
        <Route path="/" exact component={Home} />
        <Route path="/play/:mode/:level" component={Game} />
        <Route component={Home} />
      </Router>
    </Shell>
  </Provider>
);

export default App;
