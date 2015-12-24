import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classname';

export const Spinner = React.createClass({
  displayName: `Spinner`,
  mixins: [PureRenderMixin],
  render() {

    const spinnerClass = classNames([
      this.props.show ? 'spin' : 'hidden',
      'spinner',
      'player-icon-spinner'
    ]);

    return <div className={spinnerClass}></div>;
  }
});
