import React from 'react';
import { Tag } from '../../../src';
import Page from '../../component/page';

class TagsDemo extends React.Component {
  log = (e) => {
    console.log(e);
  }

  preventDefault = (e) => {
    e.preventDefault();
    console.log('Clicked! But prevent default.');
  }

  render() {
    return (
      <Page title="Tag" subTitle="标签" desc="进行标记和分类的小标签。">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Tag>Tag 1</Tag>
            <Tag><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
            <Tag closable onClose={this.log}>Tag 2</Tag>
            <Tag closable onClose={this.preventDefault}>Prevent Default</Tag>
          </code>
          <h3>2. 多彩标签</h3>
          <code>
            <div style={{marginBottom: 8}}>
              <Tag color="pink">pink</Tag>
              <Tag color="red">red</Tag>
              <Tag color="orange">orange</Tag>
              <Tag color="green">green</Tag>
              <Tag color="cyan">cyan</Tag>
              <Tag color="blue">blue</Tag>
              <Tag color="purple">purple</Tag>
            </div>
            <div style={{marginBottom: 8}}>
              <Tag color="#f50">#f50</Tag>
              <Tag color="#2db7f5">#2db7f5</Tag>
              <Tag color="#87d068">#87d068</Tag>
              <Tag color="#108ee9">#108ee9</Tag>
            </div>
          </code>
        </nav>
      </Page>
    );
  }
};

export default TagsDemo;