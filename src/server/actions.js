export const CONNECTING = 'CONNECTING';
export const CONNECTED = 'CONNECTED';
export const STOP = 'STOP';
export const MUTE = 'MUTE';
export const VOLUME = 'VOLUME';
export const NEW_SONG = 'NEW_SONG';

import { partial } from 'lodash';
import { bindActionCreators } from 'redux';

const isNotPlaying = ({ connecting, connected, playing } = {}) => {
  return (!connecting && !connected && !playing);
};

const isPlaying = ({ connected, playing } = {}) => {
  return (connected && playing);
};

/** actions **/

const playAction = (src) => ({ type: CONNECTING, src });
const connectedAction = (player, status) => ({ type: CONNECTED, status });
const newSongAction = (player, status) => ({ type: NEW_SONG, status });
const stopAction = (src) => ({ type: STOP });
const muteAction = (status) => ({ type: MUTE, status });
const volumeAction = (status) => ({ type: VOLUME, status });

/** creators **/

const startPlayback = (player, src) => {
  return (dispatch, getState) => {
    if (isPlaying(getState())) return;

    dispatch(playAction(src));
    player.play(src);
  };
};

const stopPlayback = (player) => {
  return (dispatch, getState) => {
    if(isNotPlaying(getState())) return;

    player.stop();
    dispatch(stopAction());
  };
};

const mutePlayback = (player, muteState) => {
  return (dispatch, getState) => {
    if(isNotPlaying(getState())) return;

    player.mute(muteState);
    dispatch(muteAction(player.status()));
  };
};

const volumeChange = (player, volume) => {
  return (dispatch, getState) => {
    if(isNotPlaying(getState())) return;

    player.volume(volume);
    dispatch(volumeAction(player.status()));
  };
};

export const bindPlayerToActions = (player, store) => {

  const { dispatch } = store;

  player.bind({
    start: (status) => {
      dispatch(connectedAction(player, status));
    },
    status: (status) => {
      if(!status.artist) return;

      dispatch(newSongAction(player, status));
    }
  });

  return bindActionCreators({
    startPlayback: partial(startPlayback, player),
    stopPlayback: partial(stopPlayback, player),
    mute: partial(mutePlayback, player),
    volume: partial(volumeChange, player)
  }, dispatch);

};
