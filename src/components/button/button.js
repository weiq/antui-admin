import React, {PropTypes} from 'react';
import {Button} from 'antd';
import Tooltip from '../tooltip';
import './style.less';

const ButtonGroup = Button.Group;
/**
 *  Button
 */
class ButtonComp extends React.Component {
  static propTypes = {
    /**
     * 是否用Tooltip组件显示提示信息
     */
    tooltip: PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
  };

  static defaultProps = {
  };

  render() {
    const {tooltip, ...otherProps} = this.props;
    return tooltip ? (
      <Tooltip title={tooltip || otherProps.title}>
        <Button {...otherProps} />
      </Tooltip>
    ) : <Button {...otherProps} />;
  }
};

ButtonComp.Group = ButtonGroup;

export default ButtonComp;