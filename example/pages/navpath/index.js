import React from 'react';
import { Navpath } from '../../../src';
import Page from '../../component/page';

export default class NavpathDemo extends React.Component {

  render() {
    return (
      <Page className="navpath" title="navpath" subTitle="导航栏" spacing>
        <Navpath routes={[ {"name": "用户", "path": "user"} ]} />
      </Page>
    );
  }
};