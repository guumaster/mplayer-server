import MPlayer from 'mplayer';
import { partial, inRange } from 'lodash';

export const sources = require('./sources');

const DEFAULT_OPTIONS = {
  cache: 128,
  cacheMin: 1,
  volume: 50
};

const EMPTY_STATUS = {
  playing: false,
  muted: false,
  volume: 0,
  artist: '',
  song: ''
};

const play = (player, options, src) => {
  player.openPlaylist(sources[src], options);
  player.volume(options.volume);
  return player;
};

const pause = (player) => {
  player.pause();
  return player;
};

const stop = (player) => {
  player.stop();
  player.status = {};
  return player;
};

const volume = (player, perc) => {
  const newVol = Number(perc);
  if( inRange(newVol, 0, 101)) {
    player.volume(newVol);
  }
  return player;
};

const mute = (player, set=true) => {
  // TODO: pull request to node-mplayer
  var state = set ? 1 : 0;
  player.player.cmd('mute', state);
  player.status.muted = set;
  return player;
};

// status :: player -> status
const calcStatus = (player) => {
  if(!player.status || !player.status.playing ) return EMPTY_STATUS;

  const [artist, song] = (player.status.title || ' - ').split(' - ');

  return Object.assign({}, EMPTY_STATUS, {
    playing: artist ? player.status.playing : false,
    muted: player.status.muted,
    volume: player.status.volume,
    artist,
    song
  });
};

const bind = (player, {start, status}) => {
  player.on('start', () => start(calcStatus(player)));
  player.on('status', () => status(calcStatus(player)));
};

export default (options = DEFAULT_OPTIONS) => {
  const player = new MPlayer();
  return {
    play: partial(play, player, options),
    stop: partial(stop, player),
    pause: partial(pause, player),
    volume: partial(volume, player),
    mute: partial(mute, player),
    status: partial(calcStatus, player),
    bind: partial(bind, player)
  };
};
