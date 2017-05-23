'use strict';

var _fs = require('fs');

var _path = require('path');

var _fsExtra = require('fs-extra');

var _child_process = require('child_process');

var dist = (0, _path.join)(__dirname, '../lib/components');
var cssjsFile = "'use strict';\nrequire('../../../style/index.css');\nrequire('./index.css');";

// 编译js（es6）至 es5

if ((0, _fs.existsSync)(dist)) {
  (0, _fs.readdirSync)(dist).forEach(function (cmpt) {
    var cmptPath = (0, _path.join)(dist, cmpt, 'style');
    // 编译
    console.log(cmpt + '/style/index.less > ' + cmpt + '/style/index.css');
    (0, _child_process.exec)('lessc ' + cmptPath + '/index.less > ' + cmptPath + '/index.css');
    // 创建 css.js
    console.log('touch ' + cmpt + '/style/css.js');
    (0, _fsExtra.outputFileSync)(cmptPath + '/css.js', cssjsFile, 'utf-8');
  });
} else {
  console.log(dist + ' \u76EE\u5F55\u4E0D\u5B58\u5728');
}

// 编译main less
var lessPath = (0, _path.join)(__dirname, '../lib/style');
console.log('style/index.less > /style/index.css');
(0, _child_process.exec)('lessc ' + lessPath + '/index.less > ' + lessPath + '/index.css');