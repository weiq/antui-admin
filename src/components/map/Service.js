/**
 * AMap Autocomplete service Promise style
 * 
 * return 
 * {
 *  count: 条数, info: "OK", tips: 对象数组，里面有位置信息
 * }
 */
export const Autocomplete = (keywords, opts = {}) => {
  return new Promise((resolve, reject) => {
    const search = (keywords, opts) => {
      let autoOptions = {
        city: opts.city || "", // 城市，默认全国
        ...opts
      };
      let auto = new window.AMap.Autocomplete(autoOptions);
      // 查询成功时返回查询结果
      if (keywords.length > 0) {
        auto.search(keywords, (status, result) => {
          if (status === "complete") return resolve(result);
          else if (status === "error") return reject(new Error(result));
          else if (status === "no_data") return resolve({count: 0, info: "OK", tips: []});
        });
      } else {
        return resolve({count: 0, info: "OK", tips: []});
      }
    };

    if (!window.AMap.Autocomplete) {
      window.AMap.service(["AMap.Autocomplete"], () => {
        search(keywords, opts);
      });
    } else {
      search(keywords, opts);
    }
  });
};

/**
 * 跟据给定的坐标反回当前位置描述
 */
export const GetAddress = (lnglat) => {
  return new Promise((resolve, reject) => {
    const search = (lnglat) => {
      let geocoder = new window.AMap.Geocoder();        
      geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.info === 'OK') return resolve(result);
        else if (status === "error") return reject(new Error(result));
        else if (status === "no_data") return resolve({info: "OK"});
      });   
    };

    if (!window.AMap.Geocoder) {
      window.AMap.service(["AMap.Geocoder"], () => {
        search(lnglat);
      });
    } else {
      search(lnglat);
    }   
  });
};

/**
 * 跟据给定的位置描述,反回坐标
 */
export const GetLocation = (keywords, opts = {}) => {
  return new Promise((resolve, reject) => {
    const search = (keywords, opts) => {
      if (keywords.length > 0) {
        let geocoder = new window.AMap.Geocoder(opts);
        geocoder.getLocation(keywords, (status, result) => {
          if (status === 'complete' && result.info === 'OK') return resolve(result);
          else if (status === "error") return reject(new Error(result));
          else if (status === "no_data") return resolve({resultNum: 0, info: "OK", geocodes: []});
        });
      } else {
        return resolve({resultNum: 0, info: "OK", geocodes: []});
      }
    };

    if (!window.AMap.Geocoder) {
      window.AMap.service(["AMap.Geocoder"], () => {
        search(keywords, opts);
      });
    } else {
      search(keywords, opts);
    }   
  });
};