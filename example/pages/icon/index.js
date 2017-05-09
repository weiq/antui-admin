import React from 'react';
import { Icon } from '../../../src';
import Page from '../../component/page';

export default class IconDemo extends React.Component {

  render() {
    return (
      <Page className="icon" title="icon" subTitle="导航栏" spacing>
        <Icon type='goods' />
      </Page>
    );
  }
};