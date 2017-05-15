import {once} from '../baseevent';
import {GET_CURRENT_POSITION} from '../common/NativeCB';

/**
 * 定位获取接口 
 * 例：在组件中通过
 * Map.Geolocation.getCurrentPosition("ios").then(coord => {
     alert(JSON.stringify(coord));
   }).catch(e => e.message);  // 可选
 */
class Geolocation {
  /**
   * Promise位置请求，
   * @param deviceType 设备类型信息 ios | android | default 
   *    deviceType登录后已经存到session中,通过Session.getAttribute("device")获取
   * @return 
   * 反回格式如下：
   * 调用原生接口只反回下面的 latitude， longitude 参数，
   * 其它参数为h5位置接口反回信息
   *  {
        accuracy: 2874704            --精度
        altitude: null               --海拔
        altitudeAccuracy: null
        heading: null
        latitude: 45.742366999999994 --维度
        longitude: 126.661665        --经度
        speed: null
      }
   */
  getCurrentPosition(deviceType) {
    return new Promise((resolve, reject) => {
      once(GET_CURRENT_POSITION, (position) => {
        if (deviceType === "ios") { 
          if (!window.AMap) return reject(new Error("ios 需要预先加载高德地图api！"));
          // ios 获取到的原始坐标值得转成火星坐标才能使用，需要通过高德转换,所以需要预先加载地图api.
          let lnglat = new window.AMap.LngLat(position.longitude, position.latitude);
          window.AMap.convertFrom(lnglat, "gps", (status, result) => {
            return resolve({
              longitude: result.locations[0].getLng(),
              latitude: result.locations[0].getLat()
            });
          });
        } else {
          return resolve(position);  
        }
      });
      if (deviceType === "android") {
        window.callback.startLocation();
      } else if (deviceType === "ios") {
        document.location = "gap://LightApp.StartLocation#" + JSON.stringify({param: "location"});
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            return resolve(position.coords, position);
          },
          err => {
            let errMsg = null;
            switch (err.code) {
              case 1:
                errMsg = "请求位置服务被拒绝！";
                break;
              case 2:
                errMsg = "暂时获取不到位置信息！";
                break;
              case 3:
                errMsg = "获取信息超时！";
                break;
              default: 
                errMsg = "未知错误！";
                break;
            }
            return reject(new Error(errMsg));
          },
          {
            enableHighAccuracy: true,
            maximumAge: 1000
          }
        );
      } else {
        return reject(new Error("调用定位服务失败"));
      }
    });
  }
}

const _Geolocation = new Geolocation();
export default _Geolocation;