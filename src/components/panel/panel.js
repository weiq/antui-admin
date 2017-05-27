import React, { Component, PropTypes } from 'react';
import Layout from '../layout';
import Icon from '../icon';
const { Header, Content, Footer } = Layout;
/**
 *  面板组件
 */
export default class Panel extends Component {
  static propTypes = {
    /** 面板标题 */
    title: PropTypes.string,
    /** 是否显示右上角的关闭按钮 */
    closable: PropTypes.bool,
    /** 关闭按钮回调函数 */
    onClosed: PropTypes.func,
    /** 底部内容，当不需要默认底部按钮时，可以设为 footer={null} */
    footer: PropTypes.node,
  };

  static defaultProps = {
    onClosed: () => false,
    closable: false,
  };

  render() {
    const { title, closable, onClosed, footer, children, className, ...others } = this.props;
    return (
      <Layout className={`antui-panel ${className}`} {...others}>
        <Header border="bottom" justify="space-between" size="small">
          <div className="antui-header-title">{title}</div>
          {
            closable ? (
              <div className="antui-header-closed">
                <Icon type="cross" onClick={onClosed} />
              </div>
            ) : null
          }
        </Header>
        <Content padding={`16px 8px 0 8px`}>
          { children }
        </Content>
        {
          footer === null ? null : (
            <Footer border="top" size="small">
              { footer }
            </Footer>
          )
        }
      </Layout>
    );
  }
}