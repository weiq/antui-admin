import React from 'react';
import { Tree } from 'antd';
import { SliderContainer } from '../../../src';
import Page from '../../component/page';
import './slidercontainer.less';

const TreeNode = Tree.TreeNode;

export default class SliderContainerDemo extends React.Component {
  static propTypes = {
    
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }

  render() {
    return (
      <Page className="slidercontainer" title="SliderContainer" subTitle="" spacing>
        <SliderContainer
          sideTitle='标题头'
          sideContent={(
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
          )}
        >
          内容区
        </SliderContainer>
      </Page>
    );
  }
};