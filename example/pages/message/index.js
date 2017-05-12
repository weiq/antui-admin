import React from 'react';
import Page from '../../component/page';
import { Button, message } from 'antd';
import './message.less';

export default class MessageDemo extends React.Component {
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
  custom = () => {
    message.info('自定义时长 3s,默认时长 1.5s', 3);
  };
  loading = () => {
    message.loading('加载图标', 1.5, this.onClose);
  };
  onClose = () => {
    message.info('关闭之后触发事件');
  };
  render() {
    return (
      <Page className="message" title="message" subTitle="全局提示" spacing>
        <Button type="primary" onClick={this.info} >普通提示</Button>
        <br /><br />
        <Button onClick={this.success}>成功提示</Button>
        <br /><br />
        <Button onClick={this.error}>错误提示</Button>
        <br /><br />
        <Button onClick={this.warning}>警告提示</Button>
        <br /><br />
        <Button onClick={this.custom}>自定义时长 3s</Button>
        <br /><br />
        <Button onClick={this.loading}>加载之后触发关闭</Button>
      </Page>
    );
  }
};