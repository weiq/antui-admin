import React from 'react';
import { Navpath } from '../../../src';
import Page from '../../component/page';

class NavpathDemo extends React.Component {

  render() {
    const catalog = [
      {
        "path": "/demo",
        "name": "系统管理",
        "children": [
          {
            "path": "/user",
            "name": "用户管理士大夫撒",
          },
          {
            "path": "/role",
            "name": "角色管理",
          },
          {
            "path": "/log",
            "name": "日志管理",
            "children": [
              {
                "path": "/log/test",
                "name": "日志管理"
              }
            ]
          }
        ]
      },
      {
        "path": "/level1",
        "name": "系统设置",
        "children": [
          {
            "path": "/level2",
            "name": "日志管理",
          }
        ]
      }
    ];

    return (
      <Page title="Navpath" subTitle="导航栏" desc="显示当前页面在系统层级结构中的位置，并能向上返回">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Navpath routes={[{path: '/', name: '用户管理'}]} />
          </code>
          <h3>2. 显示系统菜单</h3>
          <code>
            <Navpath routes={[{path: '/', name: '用户管理'}]} catalog={catalog} />
          </code>
        </nav>
      </Page>
    );
  }
};

export default NavpathDemo;