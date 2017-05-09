import React, { Component, PropTypes as p } from 'react';

/**
 *  Tree
 */
export default class Tree extends React.Component {
  static propTypes = {
    disabled: p.bool,
    type: p.string,
    size: p.string,
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
}