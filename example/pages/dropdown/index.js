import React from 'react';
import { Dropdown, Button } from '../../../src';
import Page from '../../component/page';

class DropdownDemo extends React.Component {
  render() {
    return (
      <Page title="Dropdown" subTitle="下拉菜单" desc="向下弹出的列表">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Tooltip title="hello Tooltip">
              <span>{ text }</span>
            </Tooltip>
          </code>
          <h3>2. 气泡框位置</h3>
          <code>
            <Tooltip placement="top" title={text}>
              <Button>top</Button>
            </Tooltip>
            <Tooltip placement="left" title={text}>
              <Button>left</Button>
            </Tooltip>
            <Tooltip placement="right" title={text}>
              <Button>right</Button>
            </Tooltip>
            <Tooltip placement="bottom" title={text}>
              <Button>bottom</Button>
            </Tooltip>
          </code>
          <h3>3. react元素提示</h3>
          <code>
            <Tooltip title={<img src={require('../../../docs/assets/images/logo.png')} />}>
              <span>提示的是一个react元素</span>
            </Tooltip>
          </code>
        </nav>
      </Page>
    );
  }
};

export default DropdownDemo;