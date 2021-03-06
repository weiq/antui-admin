import React, { Component, PropTypes } from 'react';
import Drawer from 'rc-drawer';
import cx from 'classnames';
import 'rc-drawer/assets/index.css';
/**
 * 抽屉
 */
class DrawerCmpt extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    width: PropTypes.number,
    drawerBody: PropTypes.node,
    placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
    onClosed: PropTypes.func,
    children: PropTypes.node,
    fixed: PropTypes.bool,
  };

  static defaultProps = {
    visible: false,
    width: 360,
    placement: 'right',
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    });
  }

  render() {
    const { drawerBody, placement, width, onClosed, fixed, children } = this.props;
    const sidebarStyle = placement === 'top' || placement === 'bottom' ? {height: width} : {width: width};
    
    const _sidebar = (
      <div className="antui-layout-drawer-sidebar" style={sidebarStyle}>{drawerBody}</div>
    );

    const drawerProps = {
      docked: false,
      open: this.state.visible,
      transitions: true,
      touch: true,
      enableDragHandle: false,
      position: placement,
      dragToggleDistance: 30,
      onOpenChange: (visible) => {
        if (onClosed) {
          onClosed();
        } else {
          this.setState({ visible });
        }
      }
    };

    return (
      <div className={cx("antui-layout-drawer", {fixed})}>
        <Drawer sidebar={_sidebar} {...drawerProps} style={{ overflow: 'hidden' }} sidebarStyle={{boxShadow: '0 0 0'}}>{ children }</Drawer>
      </div>
    );
  }
}

export default DrawerCmpt;