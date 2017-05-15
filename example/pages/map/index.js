import React from 'react';
import { Map } from '../../../src';
import Page from '../../component/page';
import './map.less';

export default class MapDemo extends React.Component {
  render() {
    return (
      <Page className="map" title="Map" subTitle="地图" spacing>
        <Map />
      </Page>
    );
  }
};