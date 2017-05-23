import React, { Component, PropTypes } from 'react';
import { Popover } from 'antd';
/**
 *  简单的提示气泡框。
 */
export default class Tooltip extends Component {
  static propTypes = {
    /**
     * 气泡提示
     */
    title: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]).isRequired,
    /**
     * 气泡框位置
     */
    placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom']),
    /**
     * 子元素
     */
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    placement: "top"
  };

  render() {
    const { title, placement } = this.props;
    return (
      <Popover overlayClassName="antui-tooltip" placement={placement} content={title}>
        {this.props.children}
      </Popover>
    );
  }
}