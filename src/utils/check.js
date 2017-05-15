/**
 * 判断是否为函数
 */
export function isFunction(obj) {
  return typeof obj === 'function';
}

/**
 * 判断是否为数组
 */
export function isArray(arr) {
  return Array.isArray(arr);
}

/**
 * 判断是否为object
 */
export function isObject(obj) {
  return obj === Object(obj);
};

/**
 * 判断是否为数字
 */
export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
