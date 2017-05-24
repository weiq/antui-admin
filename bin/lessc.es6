import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { outputFileSync } from 'fs-extra';
import { exec } from 'child_process';

const dist = join(__dirname, '../lib/components');
const cssjsFile = `'use strict';

var _theme = require('../../../utils/theme');

var _theme2 = _interopRequireDefault(_theme);

require('../../../style/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./' + _theme2.default + '.css');`;

if (existsSync(dist)) {
  readdirSync(dist).forEach((cmpt) => {
    const cmptPath = join(dist, cmpt, 'style');
    // 编译
    console.log(`${cmpt}/style/index.less > ${cmpt}/style/index.css`);
    exec(`lessc --relative-urls ${cmptPath}/index.less > ${cmptPath}/index.css`);
    // 创建 css.js
    console.log(`touch ${cmpt}/style/css.js`);
    outputFileSync(`${cmptPath}/css.js`, cssjsFile, 'utf-8');
  });
} else {
  console.log(`${dist} 目录不存在`);
}

// 编译main less
const lessPath = join(__dirname, '../lib/style');
console.log(`style/index.less > /style/index.css`);
exec(`lessc --relative-urls ${lessPath}/index.less > ${lessPath}/index.css`);
