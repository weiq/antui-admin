import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Breadcrumb, Menu, Dropdown } from 'antd';
const SubMenu = Menu.SubMenu;
/**
 *  显示当前页面在系统层级结构中的位置，并能向上返回
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

    // const menu = (
    //   <Menu>
    //     <Menu.Item>1st menu item</Menu.Item>
    //     <Menu.Item>2nd menu item</Menu.Item>
    //     <SubMenu title="sub menu">
    //       <Menu.Item>3d menu item</Menu.Item>
    //       <Menu.Item>4th menu item</Menu.Item>
    //     </SubMenu>
    //   </Menu>
    // );

    return (
      <Breadcrumb className="antui-navpath">
        {/*
          <Dropdown overlay={menu}>
            <Breadcrumb.Item key="home">
              <Link to="/">目录</Link>
            </Breadcrumb.Item>
          </Dropdown>
        */}
        <Breadcrumb.Item key="home">
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        { BreadcrumbItem }
      </Breadcrumb>
    );
  }
}