import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Breadcrumb, Icon } from 'antd';
/**
 *  NavPath
 */
export default class Navpath extends Component {
  static propTypes = {
    /**
     * router 的路由栈信息
     */
    routes: PropTypes.array,
  };

  static defaultProps = {
    routes: []
  };

  render() {
    const BreadcrumbItem = this.props.routes.map(({ name, path }) => (
      <Breadcrumb.Item key={path}>
        <Link to={path}>{ name }</Link>
      </Breadcrumb.Item>
    ));

    return (
      <Breadcrumb className="antui-navpath">
        <Breadcrumb.Item key="home">
          <Icon type="home" />&nbsp;
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        { BreadcrumbItem }
      </Breadcrumb>
    );
  }
}