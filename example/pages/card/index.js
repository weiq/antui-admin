import React from 'react';
import { Card } from '../../../src';
import Page from '../../component/page';

class CardDemo extends React.Component {
  render() {
    return (
      <Page title="Card" subTitle="卡片" desc="通用卡片容器">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Card title="Card title" extra={<a href="#">More</a>} style={{ width: 300 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </code>
          <h3>2. 简洁卡片</h3>
          <code>
            <Card style={{ width: 300 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </code>
        </nav>
      </Page>
    );
  }
};

export default CardDemo;