/**
 * 操作浏览器存储
 * 
 * 例： 
 * import {Session, Application} from 'storage';
 * 
 * Session.setAttribute("user", user);
 * Session.getAttribute("user");
 * 
 * Application.setAttribute("user", user);
 * Application.getAttribute("user");
 */

function storage(storage) {
  return {
    getAttribute: function(key) {
      let value = storage.getItem(key);
      return JSON.parse(value);
    },

    setAttribute: function(key, value) {
      storage.setItem(key, JSON.stringify(value));
    },

    remove: function(key) {
      storage.removeItem(key);
    },

    exist: function(key) {
      return !!storage.getItem(key);
    }
  };
}

function _Session() {
  return storage(sessionStorage);
}

function _Application() {
  return storage(localStorage);
}

const Session = new _Session();
const Application = new _Application();

export {
  Session,
  Application
};