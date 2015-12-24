import React from 'react';
import { connect } from 'react-redux';
import { combineReducers, bindActionCreators } from 'redux';

import * as actions from '../actions';
import { PlayButton, PauseButton, ConnectButton, DisconnectButton } from './buttons';
import { Spinner } from './Spinner';
import { SongInfo } from './SongInfo';

import '../shared/styles/base.css';
import style from './Player.css';

const PlayerComp = React.createClass({
  render() {

    const {
      player: { fetching, playing, artist, song },
      socket: { connecting, connected }
      } = this.props;

    const showSpinner = ( fetching || connecting );


    return <div className='Player'>
      {this.mainButton()}
      {this.connectButton()}
      <div>
        <SongInfo {...{ artist, song }} />
        <Spinner show={showSpinner} />

        <div>status: {playing ? 'playing':'paused'}</div>
        <div>connection: {connected ? 'on' : 'off'}</div>
      </div>
    </div>;
  },
  mainButton () {
    const {
      play, pause,
      player: { fetching, playing },
      socket: { connected }
      } = this.props;

    const playDisabled = !connected || fetching;
    const pauseDisabled = !connected || fetching;

    if(connected && playing) {
      return <PauseButton disabled={playDisabled} onClick={pause} />;
    }
    return <PlayButton disabled={pauseDisabled} onClick={play}/>;
  },
  connectButton () {
    const {
      connect, disconnect,
      player: { fetching },
      socket: { connected }
      } = this.props;

    if (connected) {
      return <DisconnectButton disabled={fetching} onClick={disconnect} />;
    }

    return <ConnectButton onClick={connect} />;
  }
});

const mapStateToProps = ({ player, socket }) => ({ player, socket });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComp);
