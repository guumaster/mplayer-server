import React from 'react';
import { connect } from 'react-redux';
import { combineReducers, bindActionCreators } from 'redux';
import classNames from 'classname';

import { PlayButton, PauseButton, ConnectButton, DisconnectButton } from './buttons';
import * as actions from '../actions';


const PlayerComp = React.createClass({
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
  },
  render() {

    const {
      player: { fetching, playing, artist, song },
      socket: { connecting, connected }
      } = this.props;

    const spinnerClass = classNames([
      ( fetching || connecting ) ? 'do-spin' : 'hidden',
      //'do-spin'
    ]);

    const styles = {
      fontSize: '1.25em'
    };

    return <div className="player-container">
      {this.mainButton()}
      {this.connectButton()}
      <div>


        <div style={styles}>

          <div><span className="player-icon-artist" /> { playing ? `${artist}` : '' }</div>
          <div><span className="player-icon-song" /> { playing ? `${song}` : '' }</div>

          <div>status: {playing ? 'playing':'paused'}</div>
          <div>connection: {connected ? 'on' : 'off'}</div>
          <div className={spinnerClass}><span className='player-icon-spinner' /></div>
        </div>

      </div>

    </div>;
  }
});

const mapStateToProps = ({ player, socket }) => ({ player, socket });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComp);
