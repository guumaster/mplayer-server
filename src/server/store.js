import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { CONNECTED, CONNECTING, NEW_SONG, STOP, MUTE, VOLUME } from './actions';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger({
    logger: console
  })
)(createStore);

const INITIAL_STATE = {
  src: null,
  connected: false,
  connecting: false,
  playing: false,
  muted: false,
  volume: null,
  artist: null,
  song: null
};

const rootReducer = (state=INITIAL_STATE, action) => {

  switch (action.type) {

    case CONNECTING:
      return Object.assign({}, state, {
        connecting: true,
        src: action.src
      });

    case CONNECTED:
      return Object.assign({}, state, action.status, {
        connecting: false,
        connected: true
      });

    case NEW_SONG:
    case MUTE:
    case VOLUME:
      return Object.assign({}, state, action.status);

    case STOP:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
};
