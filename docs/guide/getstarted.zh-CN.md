## 安装 (1.0.0)

使用 [npm](http://npmjs.com/):

如果 React 没安装 (全新项目)

```
npm install --save react react-dom
npm install --save antui-admin
```

如果 React 已经安装

```
npm install antui-admin --save
```

## 例子

我们的组件文档里头有很多例子, 这里提供给一个快速上手的例子:
```javascript
// app.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//使用 commonJS 模块方式 *可能需要webpack插件
//import { Button } from 'antui-admin'

//使用 ES6 方式引入
import {Button} from 'antui-admin';

//引入样式库
import 'antui-admin/lib/antui-admin.min.css';

class App extends Component {
  render() {
    return (
      <Button>hello antui</Button>
    );
  }
}

ReactDOM.render((
  <App/>
), document.getElementById('container'));

```
