import React from 'react';
import { notification, Button } from '../../../src';
import Page from '../../component/page';

class NotificationDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  render() {
    return (
      <Page title="notification" subTitle="通知提醒框" desc="全局展示通知提醒信息">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Button type="primary" onClick={this.openNotification}>Open the notification box</Button>
          </code>
          <h3>2. 带有图标的通知提醒框</h3>
          <code>
            <div>
              <Button onClick={() => this.openNotificationWithIcon('success')}>Success</Button>
              <Button onClick={() => this.openNotificationWithIcon('info')}>Info</Button>
              <Button onClick={() => this.openNotificationWithIcon('warning')}>Warning</Button>
              <Button onClick={() => this.openNotificationWithIcon('error')}>Error</Button>
            </div>
          </code>
        </nav>
      </Page>
    );
  }
};

export default NotificationDemo;