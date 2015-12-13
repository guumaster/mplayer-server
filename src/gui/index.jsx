import React from 'react';
import DOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { Player } from './components';
import configureStore from './store';

const store = configureStore();

DOM.render(
  <Provider {...{store}}>
    <Player />
  </Provider>,
  document.getElementById('app')
);

