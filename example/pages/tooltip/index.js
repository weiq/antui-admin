import React from 'react';
import { Tooltip } from '../../../src/index';
import Page from '../../component/page';

class TooltipDemo extends React.Component {
  render() {
    const text = "hello Tooltip";
    return (
      <Page title="Tooltip" subTitle="文字提示" desc="简单的提示气泡框">
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
              <span style={{ marginRight: 8 }}>top</span>
            </Tooltip>
            <Tooltip placement="left" title={text}>
              <span style={{ marginRight: 8 }}>left</span>
            </Tooltip>
            <Tooltip placement="right" title={text}>
              <span style={{ marginRight: 8 }}>right</span>
            </Tooltip>
            <Tooltip placement="bottom" title={text}>
              <span style={{ marginRight: 8 }}>bottom</span>
            </Tooltip>
          </code>
          <h3>3. react元素提示</h3>
          <code>
            <Tooltip title={<img src={require('../../../docs/assets/images/logo.png')} />}>
              <span>提示的是一个react元素</span>
            </Tooltip>
          </code>
        </nav>
        <nav>
          <h2>注意</h2>
          <span>请确保 Tooltip 的子元素能接受 onMouseEnter、onMouseLeave 事件</span>
        </nav>
      </Page>
    );
  }
};

export default TooltipDemo;