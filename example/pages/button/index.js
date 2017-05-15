import React from 'react';
import { Button } from '../../../src';
import Page from '../../component/page';
import './button.less';

export default class ButtonDemo extends React.Component {
  render() {
    return (
      <Page className="button" title="Button" subTitle="按钮" spacing>
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <section className="button-demo">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button type="primary">Button</Button>
            <Button type="primary" tooltip="I'm primary Button">Tooltip</Button>
            <Button type="default">Default</Button>
            <Button type="danger">Danger</Button>
            <Button size="small">Mini</Button>
            <Button type="default" size="small">Mini</Button>
            <Button type="dashed">Mini</Button>
          </section>
        </nav>
      </Page>
    );
  }
};