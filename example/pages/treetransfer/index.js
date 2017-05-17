import React from 'react';
import { TreeTransfer } from '../../../src/index';
import Page from '../../component/page';

class TreeTransferDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          "key": "0",
          "title": "哈尔滨",
          "children": [
            {
              "key": "0-1",
              "title": "南岗区",
              "children": [
                {
                  "key": "0-1-1",
                  "title": "黑龙江大学"
                },
                {
                  "key": "0-1-2",
                  "title": "哈尔滨理工大学"
                },
                {
                  "key": "0-1-3",
                  "title": "哈尔滨工业大学"
                }
              ]
            },
            {
              "key": "0-2",
              "title": "香坊区",
              "children": [
                {
                  "key": "0-2-1",
                  "title": "东北农业大学"
                },
                {
                  "key": "0-2-2",
                  "title": "东北林业大学"
                }
              ]
            },
            {
              "key": "0-3",
              "title": "松北区",
              "children": [
                {
                  "key": "0-3-1",
                  "title": "哈尔滨师范大学"
                },
                {
                  "key": "0-3-2",
                  "title": "黑龙江科技大学"
                }
              ]
            }
          ]
        },
        {
          "key": "1",
          "title": "齐齐哈尔",
          "children": [
            {
              "key": "1-1",
              "title": "A区",
              "children": [
                {
                  "key": "1-1-1",
                  "title": "齐齐哈尔大学"
                }
              ]
            }
          ]
        },
        {
          "key": "2",
          "title": "佳木斯",
          "children": [
            {
              "key": "2-1",
              "title": "B区",
              "children": [
                {
                  "key": "2-1-1",
                  "title": "佳木斯大学"
                }
              ]
            }
          ]
        }
      ],
      targetDemo1: [],
      targetDemo2: ["0-1-1", "1-1-1"]
    };
  }

  demo1Change = (keys) => {
    this.setState({
      targetDemo1: keys
    });
  }

  demo2Change = (keys) => {
    this.setState({
      targetDemo2: keys
    });
  }

  onLoadTree = ({treeNode, searchValue, resolve}) => {
    if (treeNode === undefined) { // 用于异步搜索树
      setTimeout(() => {
        console.log(`异步搜索关键字：${searchValue}`);
        resolve();
      }, 2000);
    } else { // 异步节点加载
      setTimeout(() => {
        console.log(`异步加载节点：${treeNode.props.eventKey}`);
        resolve();
      }, 2000);
    }
  }

  render() {
    const { dataSource, targetDemo1, targetDemo2 } = this.state;

    return (
      <Page title="TreeTransfer" subTitle="树穿梭框" desc="双栏穿梭选择框 其中，左边一栏为Tree">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <TreeTransfer title={['大学列表', '选中列表']} dataSource={dataSource} targetKeys={targetDemo1} onChange={this.demo1Change} />
          </code>
          <h3>2. 具有初始值，节点自动展开</h3>
          <code>
            <TreeTransfer dataSource={dataSource} targetKeys={targetDemo2} onChange={this.demo2Change} />
          </code>
          <h3>3. 显示搜索框</h3>
          <code>
            <TreeTransfer dataSource={dataSource} targetKeys={targetDemo2} showSearch onChange={this.demo2Change} />
          </code>
          <h3>4. 异步加载与搜索（模拟）</h3>
          <code>
            <TreeTransfer dataSource={dataSource} targetKeys={targetDemo2} showSearch onChange={this.demo2Change} onLoadTree={this.onLoadTree} />
          </code>
        </nav>
      </Page>
    );
  }
};

export default TreeTransferDemo;