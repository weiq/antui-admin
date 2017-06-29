import React, { Component, PropTypes, Children, cloneElement } from 'react';
import { Layout, Icon, Row } from 'antd';
import classNames from 'classnames';
import Drawer from './drawer';
const { Header, Sider, Content, Footer } = Layout;
/**
 * 页面级整体布局
 */
class LayoutCmpt extends Component {
  static __LAYOUT = true;
  static propTypes = {
    /** 间隔距离 */
    gutter: PropTypes.number,
    /**
     * 是否全屏宽高, 设置为false为传统流式布局
     */
    full: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    embed: PropTypes.bool,
  };

  static defaultProps = {
    gutter: 0,
    full: true,
  };

  render() {
    const { gutter, embed, children, className, full } = this.props;
    let _isDrawer = false;
    let _drawerProps = {};
    const nodes = Children.map(children, (node) => {
      if (!node) {
        return null;
      }
      if (node.props && node.type && node.type.__DRAWER) {
        const { children, ...others } = node.props;
        _drawerProps = { ...others, drawerBody: children };
        _isDrawer = true;
      }
      if (node.props && node.type && gutter > 0) {
        let style = {};
        if (node.type.__LAYOUT) {
          return cloneElement(node, { style: { ...node.props.style, ...style }, gutter: gutter, embed: true });
        } else if (node.type.__HEADER) {
          style = { marginBottom: gutter };
        } else if (node.type.__FOOTER) {
          style = { marginTop: gutter };
        } else if (node.type.__SIDER) {
          style = { marginRight: gutter };
        }
        return cloneElement(node, { style: { ...node.props.style, ...style }, gutter: true });
      }
      return node;
    });
    const returnDOM = _isDrawer ? (
      <Drawer {..._drawerProps}>
        <Layout 
          className={classNames("antui-layout", {
            [className]: !!className, 
            full
          })} 
          style={{padding: embed ? 0 : gutter}}
        >{ nodes }</Layout>
      </Drawer>
    ) : <Layout 
      className={classNames("antui-layout", {
        [className]: !!className, 
        full
      })} 
      style={{padding: embed ? 0 : gutter}}
    >{ nodes }</Layout>;

    return returnDOM;
  }
}

class ExtendsCmpt extends Component {
  static propTypes = {
    gutter: PropTypes.bool,

  };
  static defaultProps = {
    gutter: false
  };

  _getClassName = (type) => {
    return {
      [`antui-layout-${type}`]: true,
      'antui-layout-gutter': this.props.gutter
    };
  }
}

class HeaderCmpt extends ExtendsCmpt {
  static __HEADER = true;
  static propTypes = {
    border: PropTypes.string,
    justify: PropTypes.string,
    align: PropTypes.string,
    size: PropTypes.string,
    transparent: PropTypes.bool,
  };

  static defaultProps = {
    transparent: false
  };
  render() {
    const { children, justify, align, gutter, transparent, size, border, style, className } = this.props;

    const headerClass = classNames(className, {
      ...this._getClassName('header'),
      'antui-layout-header-top': border === 'top',
      'antui-layout-header-bottom': border === 'bottom',
      'antui-layout-gutter': gutter && !transparent,
      'antui-layout-header-transparent': transparent,
      'antui-layout-header-small': size === 'small',
    });
    return (
      <Header className={headerClass} style={style}>
        {
          justify || align ? (
            <Row type="flex" justify={justify} align={align}>{ children }</Row>
          ) : (
            <Row>{ children }</Row>
          )
        }
      </Header>
    );
  }
}

class SiderCmpt extends ExtendsCmpt {
  static __SIDER = true;
  static __ANT_LAYOUT_SIDER = true;

  static propTypes = {
    collapsible: PropTypes.bool,
    width: PropTypes.number
  };

  static defaultProps = {
    collapsible: false,
    width: 200,
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, gutter, className, ...others } = this.props;
    return (
      <Sider className={classNames(className, this._getClassName('sider'))} {...others} collapsedWidth={0} trigger={null} collapsed={this.state.collapsed}>
        {
          this.props.collapsible ? (
            <span className="antui-layout-sider-trigger" onClick={this.toggle}>
              <Icon type={this.state.collapsed ? 'right' : 'left'} />
            </span>
          ) : null
        }
        { this.state.collapsed ? null : children }
      </Sider>
    );
  }
}

class ContentCmpt extends ExtendsCmpt {
  static __CONTENT = true;
  static propTypes = {
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
  };

  static defaultProps = {
    padding: 0
  };
  render() {
    const { children, padding, style, className } = this.props;
    return (
      <Content className={classNames(className, this._getClassName('content'))} style={{...style, padding: padding}}>{ children }</Content>
    );
  }
}

class FooterCmpt extends ExtendsCmpt {
  static __FOOTER = true;
  static propTypes = {
    border: PropTypes.string,
    justify: PropTypes.string,
    align: PropTypes.string,
    size: PropTypes.string,
  };
  
  render() {
    const { children, justify, align, border, size, style, className } = this.props;
    const footerClass = classNames(className, {
      ...this._getClassName('footer'),
      'antui-layout-footer-top': border === 'top',
      'antui-layout-footer-bottom': border === 'bottom',
      'antui-layout-footer-small': size === 'small',
    });
    return (
      <Footer className={footerClass} style={style}>
        {justify || align ? (
          <Row type="flex" justify={justify} align={align}>{ children }</Row>
        ) : (
          <Row>{ children }</Row>
        )}
      </Footer>
    );
  }
}

class DrawerCmpt extends Component {
  static __DRAWER = true;
  render() {
    return null;
  }
}

LayoutCmpt.Header = HeaderCmpt;
LayoutCmpt.Sider = SiderCmpt;
LayoutCmpt.Content = ContentCmpt;
LayoutCmpt.Footer = FooterCmpt;
LayoutCmpt.Drawer = DrawerCmpt;

export default LayoutCmpt;