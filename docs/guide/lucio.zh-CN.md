## lucio
[![NPM version](https://img.shields.io/npm/v/lucio.svg?style=flat)](https://npmjs.org/package/lucio)
[![NPM downloads](http://img.shields.io/npm/dm/lucio.svg?style=flat)](https://npmjs.org/package/lucio)

公司级react+dva脚手架

## 开始使用
安装，创建项目，启动项目
```bash
# Install
$ npm install lucio -g

# 创建项目
$ lucio new pkgname --install

# 启动项目
$ cd pkgname
$ npm start

# 使用代码生成器
$ cd pkgname
$ lucio template --curd
```

## 命令

lucio 有2个命令 `create`, `template`

> create
```bash
$ // 通过 `Lucio` 创建一个新的项目
$ lucio create <pkgname> [options]
$ // 例如
$ lucio create pkgname
$ lucio create pkgname --install

选项
* `--install`

通过`lucio`创建的项目的文件结构
.
├── dist                        # dist 目录
    ├── index.html              # html 文件            
├── src                         # src 目录
    ├── routes                  # 路由目录
        ├── demo                # 模块目录
            ├── components      # 组件目录
                ├── index.js    # 组件 index 文件
                └── style.less  # less 文件
            ├── model.js        # dva model 文件     
            └── service.js      # 数据交互文件
    ├── config.js               # 全局配置文件
    ├── index.js                # dva main 文件
    └── router.js               # router 配置文件
├── .eslintrc                   # eslint 配置文件
├── .eslintignore               # 
├── .editorconfig               #
├── .lucio.curd                 # lucio curd 模版配置文件
├── webapck.config.dev.js       # webpack 开发环境配置文件
├── webapck.config.prod.js      # webpack 生产环境配置文件
└── package.json                # 
```

> template
```bash
$ // 通过 `Lucio` 和 `模版配置文件` 创建一个新的模块
$ lucio template [options]
$ // 例如
$ lucio template --curd

选项
* `--curd`
```

## 贡献

你可以提交你的ideas作为[pull requests](https://github.com/jindada/lucio) 或者作为 [Github issue](https://github.com/jindada/lucio/issues)