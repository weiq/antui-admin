import React from 'react';
import { Layout } from '../../../src';
import Page from '../../component/page';
import './style.less';
const { Header, Sider, Content, Footer, Drawer } = Layout;

export default class LayoutDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible_1: false,
      visible_2: false,
      visible_3: false
    };
  }

  handleDrawer = (id) => {
    this.setState({
      visible_1: false,
      visible_2: false,
      visible_3: false,
      [`visible_${id}`]: !this.state[`visible_${id}`]
    });
  }

  render() {
    return (
      <Page title="Layout" subTitle="布局" desc="页面级整体布局">
        <nav>
          <h2>组件概述</h2>
          <h4>布局容器，其下可嵌套 Header Sider Content Footer Drawer 或 Layout 本身，可以放在任何父容器中</h4>
        </nav>
        <nav className="layout-example">
          <h2>代码演示</h2>
          <h3>最简单的使用</h3>
          <code>
            <Layout>
              <Header border="bottom" justify="space-between" transparent>
                <div style={{backgroundColor: 'yellow'}}>left</div>
                <div style={{backgroundColor: 'red'}}>right</div>
              </Header>
              <Layout>
                <Sider>Sider</Sider>
                <Content padding={8}>Content</Content>
              </Layout>
              <Footer border="top">Footer</Footer>
            </Layout>
          </code>
          <h3>layout间隔</h3>
          <code>
            <Layout gutter={8}>
              <Header transparent>Header</Header>
              <Layout>
                <Sider>Sider</Sider>
                <Content>Content</Content>
              </Layout>
              <Footer>Footer</Footer>
            </Layout>
          </code>
          <h3>没有Sider</h3>
          <code>
            <Layout gutter={8}>
              <Header>Header</Header>
              <Content>Content</Content>
              <Footer>Footer</Footer>
            </Layout>
          </code>
          <h3>Layout嵌套</h3>
          <code>
            <Layout gutter={8}>
              <Header>Header</Header>
              <Layout>
                <Sider>Sider</Sider>
                <Content>
                  <Layout>
                    <Header>Header</Header>
                    <Layout>
                      <Sider width={100}>Sider</Sider>
                      <Content>Content</Content>
                    </Layout>
                    <Footer>Footer</Footer>
                  </Layout>
                </Content>
              </Layout>
              <Footer>Footer</Footer>
            </Layout>
          </code>
          <h3>Sider可收起与设置自定义宽度</h3>
          <code>
            <Layout>
              <Header>Header</Header>
              <Layout>
                <Sider collapsible width={100}>Sider</Sider>
                <Content>Content</Content>
              </Layout>
              <Footer>Footer</Footer>
            </Layout>
          </code>
          <h3>Drawer抽屉容器</h3>
          <code>
            <h4 onClick={() => { this.handleDrawer(1); }}>open抽屉</h4>
            <Layout>
              <Header>Header</Header>
              <Layout>
                <Sider collapsible width={100}>Sider</Sider>
                <Content>Content</Content>
              </Layout>
              <Footer>Footer</Footer>
              <Drawer visible={this.state.visible_1} placement="bottom" width={200}>
                <div>这是一个Drawer</div>
              </Drawer>
            </Layout>
          </code>
          <h3>嵌套Drawer抽屉</h3>
          <code>
            <h4 onClick={() => { this.handleDrawer(2); }}>open外层的抽屉</h4>
            <h4 onClick={() => { this.handleDrawer(3); }}>open里层的抽屉</h4>
            <Layout gutter={8}>
              <Drawer visible={this.state.visible_2} width={200}>
                <div>这是外层的抽屉</div>
              </Drawer>
              <Header>Header</Header>
              <Layout>
                <Sider>Sider</Sider>
                <Content>
                  <Layout>
                    <Drawer visible={this.state.visible_3} width={120}>
                      <div>这是里层的抽屉</div>
                    </Drawer>
                    <Header>Header</Header>
                    <Layout>
                      <Sider>Sider</Sider>
                      <Content>Content</Content>
                    </Layout>
                    <Footer>Footer</Footer>
                  </Layout>
                </Content>
              </Layout>
              <Footer>Footer</Footer>
            </Layout>
          </code>
        </nav>
      </Page>
    );
  }
};