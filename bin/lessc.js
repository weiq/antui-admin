'use strict';

var _path = require('path');

var _fs = require('fs');

var _fsExtra = require('fs-extra');

var _child_process = require('child_process');

// 获取所有的目录
// 循环编译
// 如果没有less文件 创建一个
var componentsPath = (0, _path.join)(__dirname, '../lib/components');

if ((0, _fs.existsSync)(componentsPath)) {
  var components = (0, _fs.readdirSync)(componentsPath) || [];
  for (var i = 0; i < components.length; i++) {
    var currentPath = (0, _path.join)(componentsPath, components[i]);
    var stats = (0, _fs.statSync)(currentPath);
    if (stats.isDirectory()) {
      var currentLessPath = (0, _path.join)(currentPath, 'style.less');
      if (!(0, _fs.existsSync)(currentLessPath)) {
        console.log('\u521B\u5EFA ' + currentLessPath);
        (0, _fsExtra.outputFileSync)(currentLessPath, "", 'utf-8');
      }
      console.warn('lessc ' + currentPath + '/style.less > style.css');
      (0, _child_process.exec)('lessc ' + currentPath + '/style.less > ' + currentPath + '/style.css');
    }
  }
}