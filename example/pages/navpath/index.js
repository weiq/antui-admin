import React from 'react';
import { Navpath } from '../../../src';
import Page from '../../component/page';

class NavpathDemo extends React.Component {

  render() {
    return (
      <Page title="Navpath" subTitle="导航栏" desc="显示当前页面在系统层级结构中的位置，并能向上返回">
        <Navpath routes={ [{path: '/', name: '用户管理'}] } />
      </Page>
    );
  }
};

export default NavpathDemo;