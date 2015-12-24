import React from 'react';
import DOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { Player } from './components';
import configureStore from './store';
import DevTools from './DevTools';

const store = configureStore();

DOM.render(
  <Provider {...{store}}>
    <div>
      <Player />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);

