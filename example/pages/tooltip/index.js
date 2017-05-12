import React from 'react';
import { Tooltip, Button } from '../../../src';
import Page from '../../component/page';

class TooltipDemo extends React.Component {
  render() {
    const text = "hello Tooltip";
    return (
      <Page title="Tooltip" subTitle="气泡提示" desc="简单的提示气泡框">
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

export default TooltipDemo;