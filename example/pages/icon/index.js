import React from 'react';
import { Icon } from '../../../src';
import Page from '../../component/page';
import './icon.less';

export default class IconDemo extends React.Component {

  render() {
    return (
      <Page className="icon" title="icon" subTitle="导航栏" spacing>
        <div>
          <Icon type='goods' />
          <br />goods
        </div>
      </Page>
    );
  }
};