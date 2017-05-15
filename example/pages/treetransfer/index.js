import React from 'react';
import { TreeTransfer } from '../../../src/index';
import Page from '../../component/page';

class TreeTransferDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetKeys: []
    };
  }

  handleTransfer = (selectKeys) => {
    this.setState({
      targetKeys: selectKeys
    });
  }

  hanleDelete = (keys) => {
    this.setState({
      targetKeys: this.state.targetKeys.filter((_k) => keys.indexOf(_k) === -1)
    });
  }

  render() {
    const dataSource = [
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
    ];

    return (
      <Page title="TreeTransfer" subTitle="树穿梭框" desc="双栏穿梭选择框 其中，左边一栏为Tree">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <TreeTransfer dataSource={dataSource} onTransfer={this.handleTransfer} onDelete={this.hanleDelete} targetKeys={this.state.targetKeys} />
          </code>
        </nav>
      </Page>
    );
  }
};

export default TreeTransferDemo;