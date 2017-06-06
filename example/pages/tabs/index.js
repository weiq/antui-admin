import React from 'react';
import { Tabs, Button } from '../../../src';
import Page from '../../component/page';
const TabPane = Tabs.TabPane;

class TabsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { position: 'top' };
  }

  changeTabPosition = (position) => {
    this.setState({ position });
  }

  render() {
    return (
      <Page title="标签页" subTitle="标签页" desc="选项卡切换组件">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
              <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
              <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
          </code>
          <h3>2. 位置</h3>
          <code>
            <div style={{marginBottom: 8}}>
              <Button onClick={() => this.changeTabPosition('top')}>top</Button>
              <Button onClick={() => this.changeTabPosition('left')}>left</Button>
              <Button onClick={() => this.changeTabPosition('bottom')}>bottom</Button>
              <Button onClick={() => this.changeTabPosition('right')}>right</Button>
            </div>
            <Tabs tabPosition={this.state.position}>
              <TabPane tab="Tab 1" key="1">Content of Tab 1</TabPane>
              <TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
              <TabPane tab="Tab 3" key="3">Content of Tab 3</TabPane>
            </Tabs>
          </code>
          <h3>3. 卡片式页签</h3>
          <code>
            <Tabs type="card">
              <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
              <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
              <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
          </code>
        </nav>
      </Page>
    );
  }
};

export default TabsDemo;