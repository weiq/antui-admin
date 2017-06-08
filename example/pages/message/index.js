import React from 'react';
import { message, Button } from '../../../src';
import Page from '../../component/page';

class MessageDemo extends React.Component {

  info = () => {
    message.info('This is a normal message');
  };

  success = () => {
    message.success('This is a message of success');
  };

  error = () => {
    message.error('This is a message of error');
  };

  warning = () => {
    message.warning('This is message of warning');
  };

  render() {
    return (
      <Page title="message" subTitle="全局提示" desc="全局展示操作反馈信息">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Button type="primary" onClick={this.info}>Display normal message</Button>
          </code>
          <h3>2. 其他提示类型</h3>
          <code>
            <div>
              <Button onClick={this.success}>Success</Button>
              <Button onClick={this.error}>Error</Button>
              <Button onClick={this.warning}>Warning</Button>
            </div>
          </code>
        </nav>
      </Page>
    );
  }
};

export default MessageDemo;