import React from 'react';
import { Tree } from '../../../src';
import Page from '../../component/page';
const TreeNode = Tree.TreeNode;

class TreeDemo extends React.Component {

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }

  render() {
    return (
      <Page title="Tree" subTitle="树形控件" desc="用来展示文件夹、组织架构、生物分类、国家地区等等">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Tree
              checkable
              defaultExpandedKeys={['0-0-0', '0-0-1']}
              defaultSelectedKeys={['0-0-0', '0-0-1']}
              defaultCheckedKeys={['0-0-0', '0-0-1']}
              onSelect={this.onSelect}
              onCheck={this.onCheck}
            >
              <TreeNode title="parent 1" key="0-0">
                <TreeNode title="parent 1-0" key="0-0-0" disabled>
                  <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                  <TreeNode title="leaf" key="0-0-0-1" />
                </TreeNode>
                <TreeNode title="parent 1-1" key="0-0-1">
                  <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
                </TreeNode>
              </TreeNode>
            </Tree>
          </code>
        </nav>
      </Page>
    );
  }
};

export default TreeDemo;