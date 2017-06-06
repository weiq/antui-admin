import React from 'react';
import { Popconfirm } from '../../../src';
import Page from '../../component/page';

class PopconfirmDemo extends React.Component {

  confirm = (e) => {
    console.log('Click on Yes');
  }

  cancel = (e) => {
    console.log('Click on No');
  }

  render() {
    return (
      <Page title="Popconfirm" subTitle="气泡确认框" desc="点击元素，弹出气泡式的确认框">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
              <a href="#">Delete</a>
            </Popconfirm>
          </code>
          <h3>2. 自定义按钮文字</h3>
          <code>
            <Popconfirm title="Are you sure？" okText="确认" cancelText="取消">
              <a href="#">Delete</a>
            </Popconfirm>
          </code>
        </nav>
      </Page>
    );
  }
};

export default PopconfirmDemo;