import LoadAmapAPI from './amap';
// import notify from '../Notify';
/**
 * 加载AMap api 库
 * @param callback 加载完成后的回调函数
 */
export const LoadAMapAPI = (callback, opts) => {
  LoadAmapAPI({plugin: true, ...opts}).then((AMap) => {
    callback && callback();
  }).catch((e) => {
    // notify.error(e.message);
    console.log(e.message);
  });
};
/**
 * 生成线条样式函数， 样式参考高德地图 PolylineOptions 中的设置
 * http://lbs.amap.com/api/javascript-api/reference/overlay/#Polyline
 */
export const lineStyleFunc = (style) => {
  const lineStyle = {
    strokeColor: style.strokeColor || "#5298ff",                          // 线颜色
    isOutline: style.isOutline || false,                                  // 是否有描边
    outlineColor: style.isOutline && (style.outlineColor || "#3d6dcc"),   // 描边颜色
    strokeOpacity: style.strokeOpacity || 1,                 // 线透明度
    strokeWeight: style.strokeWeight || 2,                   // 线宽
    strokeStyle: style.strokeStyle || "solid",               // 线样式
    strokeDasharray: style.strokeDasharray || [10, 5]        // 补充线样式
  };
  return lineStyle;
};

export const trackStyle = lineStyleFunc({isOutline: true});  // 轨迹样式， 仿百度地图样式
export const lineStyle = lineStyleFunc({strokeColor: "#F50", strokeWeight: 2});   // 普通线样式

/**
 * 地图画线功能
 * @param lineCoords 线坐标 例: [[0,0], [1,1], [2,2]]
 * @param map 高德地图对象
 * @param style [可选] 线样式，与高德地图线样式配置一致
 */
export const drawLine = (lineCoords, map, style = lineStyle) => {
  let polyline = new window.AMap.Polyline({
    path: lineCoords,
    ...style
  });
  polyline.setMap(map);
  return polyline;
};

/**
 * 画轨迹功能，参考drawLine函数
 * @param lineCoords 线坐标 例: [[0,0], [1,1], [2,2]]
 * @param map 高德地图对象
 * @param style [可选] 线样式，与高德地图线样式配置一致
 */
export const drawTrack = (lineCoords, map, style = trackStyle) => {
  return drawLine(lineCoords, map, style);
};

export const pointType = {
  red: "'color: #f34234'",        // 红
  blue: "'color: #3d93fd'",       // 蓝
};

/**
 * 画点功能
 * @param coord 点坐标 例: [116.397428, 39.90923]
 * @param map 高德地图对象
 */
export const drawPoint = (coord, map, opts = {}) => {
  const _popup = popup(null, null, opts.simplePopup ? {simple: true} : {});

  let marker = new window.AMap.Marker({
    map,
    position: coord,                          // 基点位置
    offset: new window.AMap.Pixel(-12, -32),  // 相对于基点的偏移位置
    draggable: !!opts.draggable,                          // 是否可拖动
    zIndex: opts.zIndex || 100,
    content: `<div 
      ${opts.id ? "id=marker-" + opts.id : ""} 
      ${opts.content ? "data-content=" + opts.content : ""} 
      ${opts.title ? "title=" + opts.title : ""}
      ${opts.style ? "style=" + pointType[opts.style] : ""}
      class="marker-poi 
        ${opts.animate ? "marker-" + opts.animate : ""}
        ${opts.type ? opts.type : ""}
      " 
    >
      <i class="iconfont iconfont-map-pin2"></i>
    </div>`   // 自定义点标记覆盖物内容
  });

  if (opts.popupContent) {
    _popup.setContent(
      createInfoWindow(
        opts.popupTitle, 
        opts.popupContent, 
        map, 
        opts.simplePopup ? "slide-popup-content" : null,
        opts.popupRightContent)
    );
  }

  opts.popupContent && marker.on('click', e => {
    _popup.open(map, e.target.getPosition());
  });

  marker.popup = _popup;

  return marker;
};

/**
 * 在指定位置显示弹出信息窗体
 */
export const popup = (coord, map, opts = {}) => {
  let popup = new window.AMap.InfoWindow({
    isCustom: true,
    closeWhenClickMap: opts.simple ? true : !opts.closeWhenClickMap,
    offset: opts.simple ? new window.AMap.Pixel(0, 10) : new window.AMap.Pixel(0, -40),
  });

  if (coord) {
    popup.open(map, Array.isArray(coord) ? new window.AMap.LngLat(coord[0], coord[1]) : coord);
  } 

  if (opts.content) {
    popup.setContent(
      createInfoWindow(
        opts.title, 
        opts.content, 
        map, 
        opts.simple ? "slide-popup-content" : null,
        opts.rightContent)
    );
  }
  
  return popup;
};

const createInfoWindow = (title, content, map, className, rightContent) => {
  let info = document.createElement("div");
  info.className = className || "popup-content";

  let top = document.createElement("div");
  let titleD = document.createElement("div");
  let closeX = document.createElement("img");
  top.className = "popup-top";
  titleD.innerHTML = '<i class="anticon anticon-environment"></i> ' + title;
  closeX.src = "http://webapi.amap.com/images/close2.gif";
  closeX.onclick = () => {
    map.clearInfoWindow();
  };

  top.appendChild(titleD);
  top.appendChild(closeX);
  info.appendChild(top);

  // 定义中部内容
  let middle = document.createElement("div");
  middle.className = "popup-middle";
  middle.style.backgroundColor = 'white';
  middle.innerHTML = content;
  info.appendChild(middle);

  // 定义底部内容
  let bottom = document.createElement("div");
  bottom.className = "popup-bottom";
  bottom.style.position = 'relative';
  bottom.style.top = '0px';
  bottom.style.margin = '0 auto';
  if (rightContent) bottom.innerHTML = rightContent;
  info.appendChild(bottom);
  return info;
};

