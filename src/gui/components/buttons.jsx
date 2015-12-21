import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classname';

import { noop } from '../actions';

const createButton = ({ action='Nothing', icon, color }) => {
  return React.createClass({
    displayName: `${action}Button`,
    mixins: [PureRenderMixin],
    render() {
      const {
        onClick=noop,
        disabled } = this.props;
      const btnClass = classNames([
        'player-icon',
        `player-icon-${(icon || action).toLowerCase()}`,
        color?`player-icon__${color}`:''
      ]);

      return <button className={btnClass} disabled={disabled} onClick={onClick} />;
    }
  })
};

export const ConnectButton = createButton({action: 'Connect', icon: 'power', color: 'green'});
export const DisconnectButton = createButton({ action: 'Disconnect', icon: 'power', color: 'red' });
export const PlayButton = createButton({action: 'Play'});
export const PauseButton = createButton({action: 'Pause'});
