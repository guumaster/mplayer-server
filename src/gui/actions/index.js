import { connect as sockConn } from 'socket.io-client';

import * as types from './types';

export const noop = () => { console.log('noop') };

const commands = {
  SEND_PLAY: 'play',
  SEND_PAUSE: 'stop'
};

let SOCKET = {};

export const play = () => remoteAction(types.SEND_PLAY, types.PLAYING);
export const pause = () => remoteAction(types.SEND_PAUSE, types.PAUSED);

export const connect = () => {
  return dispatch => {
    if ( SOCKET && SOCKET.connected ) return;

    dispatch(connectingAction());

    if (SOCKET.disconnected ) {
      SOCKET.connect();

    } else {
      SOCKET = sockConn('http://localhost:3000', {forceNew: true});

      SOCKET.on('connect', function() {
        dispatch(connectedAction());
      });

      SOCKET.on('state', function(state) {
        dispatch(playerState(state));
      });

    }
  }
};

export const disconnect = () =>  {
  return dispatch => {
    if (!SOCKET.connected) return;

    SOCKET.disconnect();
    dispatch(disconnectAction());
  }
};

const connectingAction = () => ({ type: types.CONNECTING });
const connectedAction = () => ({ type: types.CONNECTED });
const disconnectAction = () => ({ type: types.DISCONNECT });
const playerState = (state) => ({ type: types.PLAYER_STATE, state });

function remoteAction(sending, received) {
  return dispatch => {
    dispatch(sendingAction(sending));
    return fetch(`http://localhost:3000/${commands[sending]}`)
      .then(() => dispatch(actionReceived(received)))
  }
}

const sendingAction = (type) => ({ type });
const actionReceived = (type) => ({ type });
