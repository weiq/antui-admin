import React from 'react';

/**
 *  Button
 */
export default class Button extends React.Component {
  static propTypes = {
    disabled: React.PropTypes.bool,
    /**
     * Options: primary, default, warn, vcode
     *
     */
    type: React.PropTypes.string,
    /**
     * 123123
     *
     */
    size: React.PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    type: 'primary',
    size: 'normal',
  };

  render() {
    return (
      <div>123</div>
    );
  }
};
