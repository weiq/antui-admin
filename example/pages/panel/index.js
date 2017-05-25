import React from 'react';
import { Layout, Panel, Form, Button } from '../../../src';
import Page from '../../component/page';
const { Drawer } = Layout;

class PanelDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
    };
  }

  handleVisiable = () => {
    this.setState({
      visible: !this.state.visible
    });
  }
  render() {
    return (
      <Page title="Panel" subTitle="面板" desc="面板组件">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code style={{width: 200, height: 300}}>
            <Panel title="最简单的使用" footer={<Button type="primary">确定</Button>} />
          </code>
          <h3>1. 与form，layout.drawer 搭配使用</h3>
          <code style={{height: 400}}>
            <a onClick={this.handleVisiable}>打开/关闭抽屉</a>
            <Layout>
              <Drawer visible={this.state.visible}>
                <Panel title="新增用户" closable onClosed={() => { this.setState({visible: false}) }}>
                  <Form columns={columns} />
                </Panel>
              </Drawer>
            </Layout>
          </code>
        </nav>
      </Page>
    );
  }
};

const columns = [{
  name: "id",
  formItem: {
    type: "hidden"
  }
}, {
  title: "角色类型",
  name: "roleType",
  dict: [
    {code: "1", codeName: "111"},
    {code: "2", codeName: "222"},
    {code: "3", codeName: "333"},
  ],
  formItem: {
    type: "select"
  }
}, {
  title: "角色名",
  name: "roleName",
  formItem: {}
}];

export default PanelDemo;