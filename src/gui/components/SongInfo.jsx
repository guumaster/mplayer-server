import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classname';

export const SongInfo = React.createClass({
  displayName: `SongInfo`,
  mixins: [PureRenderMixin],
  render() {
    const {
        artist,
        song
      } = this.props;

    return <div>
      <div><span className="player-icon-artist" /> { artist }</div>
      <div><span className="player-icon-song" /> { song }</div>
    </div>;

  }
});
