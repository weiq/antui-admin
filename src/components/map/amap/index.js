export default ({
  key,
  timeout = 10000,
  v = 1.3,
  plugin,
  service
} = {}) => {
  const callbackName = '__mapsApiOnLoadCallback';

  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(new Error('Can only load the AMap API in the browser'));
    }

    if (document.querySelector("#amap_api_point")) {
      if (window.AMap) return resolve(window.AMap);
      else document.querySelector("#amap_api_point").remove();
    }

    const scriptElement = document.createElement('script');
    const params = [`callback=${callbackName}`];
    if (key) params.push(`key=${key}`);
    if (v) params.push(`v=${v}`);
    if (plugin) {
      params.push(`&plugin=AMap.Scale,AMap.OverView,AMap.ToolBar`); // 这块可以细分到具体加载哪个工具
    }
    scriptElement.src = `http://webapi.amap.com/maps?${params.join('&')}`;
    scriptElement.id = 'amap_api_point';

    let timeoutId = null;
    if (timeout) {
      timeoutId = setTimeout(() => {
        window[callbackName] = () => {};
        reject(new Error('不能加载高德地图API'));
      }, timeout);
    }

    window[callbackName] = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      if (service) {
        if (Array.isArray(service)) {
          window.AMap.service(service);
        } else {
          window.AMap.service([service]);
        }
      }
      resolve(window.AMap);
      delete window[callbackName];
    };

    document.body.appendChild(scriptElement);
  });
};