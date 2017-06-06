import React from 'react';
import { Collapse } from '../../../src';
import Page from '../../component/page';
const Panel = Collapse.Panel;

class CollapseDemo extends React.Component {
  render() {
    const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;

    return (
      <Page title="Collapse" subTitle="折叠面板" desc="可以折叠/展开的内容区域">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Collapse defaultActiveKey={['1']}>
              <Panel header="This is panel header 1" key="1">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 2" key="2">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 3" key="3">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </code>
          <h3>2. 手风琴</h3>
          <code>
            <Collapse accordion>
              <Panel header={'This is panel header 1'} key="1">
                <p>{text}</p>
              </Panel>
              <Panel header={'This is panel header 2'} key="2">
                <p>{text}</p>
              </Panel>
              <Panel header={'This is panel header 3'} key="3">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </code>
        </nav>
      </Page>
    );
  }
};

export default CollapseDemo;