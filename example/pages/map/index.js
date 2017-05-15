import React from 'react';
import { Map } from '../../../src';
import Page from '../../component/page';
import './map.less';

export default class MapDemo extends React.Component {
  constructor(props) {
    super();

    this.state = {
      map: null,
      tracks: [],
      terminals: [],
    };
  }

  handleMapLoaded(map, AMap) {
    map.addControl(new AMap.ToolBar({
      liteStyle: true,
      locate: true,
      position: "RT"
    }));

    map.addControl(new AMap.OverView());
  }
  render() {
    return (
      <Page className="map" title="Map" subTitle="地图" spacing>
        <Map 
          className="myMap"
          zoom={13}
          center={[126.66817904, 45.73754846]}
          onMapLoaded={this.handleMapLoaded}
        />
      </Page>
    );
  }
};