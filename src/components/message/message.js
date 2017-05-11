import React from 'react';
import './style.less';
/**
 *  Message
 */
export default class Message extends React.Component {
  static propTypes = {
    /**
     * aaa
     *
     */
    content: React.PropTypes.string,
    /**
     * b
     *
     */
    duration: React.PropTypes.number,
    /**
     * 
     *c
     */
    onClose: React.PropTypes.func,
    
  };

  static defaultProps = {
    content: '-',
    duration: '1.5',
    onClose: '-',
  };

  render() {
    return (
      <div>123</div>
    );
  }
};