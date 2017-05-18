import React from 'react';
import LoadAmapAPI from './amap';
// import notify from '../Notify';
import objectAssign from 'object-assign';
import './style.less';

export default class Map extends React.Component {
  static propTypes = {
    lon: React.PropTypes.number,
    lat: React.PropTypes.number,
    center: React.PropTypes.array,
    zoom: React.PropTypes.number,
    onMapLoaded: React.PropTypes.func,
    children: React.PropTypes.node,
    mapKey: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.AMap = window.AMap;
    this.state = {
      AMap: null,
      mapLoaded: false,
      mapLoading: true,
      mapLoadError: false,
    };
  }

  componentDidMount() {
    if (!window.AMap) {
      LoadAmapAPI({key: this.props.mapKey, plugin: true}).then((AMap) => {
        this.initMap();

        this.setState({
          mapLoaded: true
        });
      }).catch((e) => {
        // notify.error(e.message);
        console.warn(e.message)
        this.setState({
          mapLoaded: false,
          mapLoading: false,
          mapLoadError: e.message
        });
      });
    } else {
      this.initMap();
      
      this.setState({
        mapLoaded: true,
      });
    }
  }

  componentWillUnmount() {
    // 解除事件绑定
    this.map.off('complete', this.onMapLoaded);
  }

  initMap = () => {
    const {lon, lat, center, zoom} = this.props;

    let opts = objectAssign({resizeEnable: true}, 
      center && {center: center || [lon, lat]},
      zoom && {zoom}
    );
    this.map = new window.AMap.Map("_amap_point", opts);

    this.map.on('complete', () => this.onMapLoaded(this.map));
  }

  onMapLoaded = (map) => {
    this.props.onMapLoaded && this.props.onMapLoaded(map, window.AMap, this);

    this.setState({
      mapLoading: false
    });
  }

  render() {
    const {children, ...otherProps} = this.props;
    const {mapLoadError, mapLoading} = this.state;

    delete otherProps.onMapLoaded;
    delete otherProps.lon;
    delete otherProps.lat; 
    delete otherProps.center; 
    delete otherProps.zoom;
        
    return (
      <div id="maps" {...otherProps}>
        <div id="_amap_point">
          {mapLoading ? "地图加载中..." : null}
          {mapLoadError ? "地图初始化出错：" + mapLoadError : null}
        </div>
        {children}
      </div>
    );
  }
};