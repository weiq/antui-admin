import React, { Component, PropTypes } from 'react';
import RcTooltip from 'rc-tooltip';
/**
 *  NavPath
 */
export default class Tooltip extends Component {
  static propTypes = {
    /**
     * 提示文字
     */
    title: PropTypes.element.isRequired,
    /**
     * 气泡框位置
     */
    placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'])
  };

  static defaultProps = {
    title: null,
    placement: "top"
  };

  render() {
    const { title, placement } = this.props;
    return (
      <RcTooltip placement={placement} trigger={['click']} overlay={title} />
    );
  }
}