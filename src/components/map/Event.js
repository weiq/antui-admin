// 参考 http://lbs.amap.com/api/javascript-api/reference/event/

export const addListener = (instance, eventName, handler, context) => {
  return window.AMap.event.addListener(instance, eventName, handler, context);
};

export const removeListener = (listener) => {
  window.AMap.event.removeListener(listener);
};
