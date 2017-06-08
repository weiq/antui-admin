import React from 'react';
import { Modal, Button } from '../../../src';
import Page from '../../component/page';

class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  render() {
    return (
      <Page title="Modal" subTitle="对话框" desc="模态对话框">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <div>
              <Button type="primary" onClick={() => { this.setState({visible: true}); }}>Open</Button>
              <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={() => { this.setState({visible: false}); }}
                onCancel={() => { this.setState({visible: false}); }}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </div>
          </code>
          <h3>2. 信息提示</h3>
          <code>
            <div>
              <Button onClick={info}>Info</Button>
              <Button onClick={success}>Success</Button>
              <Button onClick={error}>Error</Button>
              <Button onClick={warning}>Warning</Button>
            </div>
          </code>
        </nav>
      </Page>
    );
  }
};

function info() {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

function success() {
  Modal.success({
    title: 'This is a success message',
    content: 'some messages...some messages...',
  });
}

function error() {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
}

function warning() {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
}

export default ModalDemo;