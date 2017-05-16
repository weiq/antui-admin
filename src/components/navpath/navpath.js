import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Breadcrumb, Menu, Dropdown } from 'antd';
const SubMenu = Menu.SubMenu;
/**
 *  显示当前页面在系统层级结构中的位置，并能向上返回
 */
export default class Navpath extends Component {
  static propTypes = {
    /** 菜单信息 */
    catalog: PropTypes.array,
    /** router 的路由栈信息 */
    routes: PropTypes.array,
  };

  static defaultProps = {
    catalog: [],
    routes: []
  };

  render() {
    const BreadcrumbItem = this.props.routes.map(({ name, path }) => (
      <Breadcrumb.Item key={path}>
        <Link to={path}>{ name }</Link>
      </Breadcrumb.Item>
    ));

    const loop = data => data.map((item) => {
      const { name, path, children } = item;
      if (children === undefined) {
        return (
          <Menu.Item key={path} >
            <Link to={path}>{name}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={path} title={<span style={{paddingRight: 24}}>{name}</span>}>
            {loop(item.children)}
          </SubMenu>
        );
      }
    });

    return (
      <Breadcrumb className="antui-navpath">
        {
          this.props.catalog.length === 0 ? null : (
            <Breadcrumb.Item key="home">
              <Dropdown overlay={<Menu>{loop(this.props.catalog)}</Menu>}>
                <Link to="/">目录</Link>
              </Dropdown>
            </Breadcrumb.Item>
          )
        }
        <Breadcrumb.Item key="home">
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        { BreadcrumbItem }
      </Breadcrumb>
    );
  }
}