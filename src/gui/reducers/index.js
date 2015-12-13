import { combineReducers } from 'redux';
import { SEND_PLAY, SEND_PAUSE, PLAYER_STATE, CONNECTED, CONNECTING, DISCONNECT } from '../actions/types';


const player = (state={}, action) => {

  switch(action.type) {
    case SEND_PLAY:
    case SEND_PAUSE:
     return Object.assign({}, state, {
       fetching: true
     });

    case PLAYER_STATE:
      return Object.assign({}, state, action.state, {
        fetching: false
      });

    default:
      return state;
  }
};

const socket = (state={}, action) => {

  switch (action.type) {
    case CONNECTING:
      return {
        connecting: true,
        connected: false
      };

    case CONNECTED:
      return {
        connecting: false,
        connected: true
      };
    case DISCONNECT:
      return {
        connecting: false,
        connected: false
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({ player, socket });

export default rootReducer;
