import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { noop } from '../actions';

const createButton = (action='Nothing') => {
  return React.createClass({
    displayName: `${action}Button`,
    mixins: [PureRenderMixin],
    render() {
      const {
        onClick=noop,
        disabled } = this.props;

      return <button disabled={disabled} onClick={onClick}>{action}</button>;
    }
  })
};

export const ConnectButton = createButton('Connect');
export const DisconnectButton = createButton('Disconnect');
export const PlayButton = createButton('Play');
export const PauseButton = createButton('Pause');
