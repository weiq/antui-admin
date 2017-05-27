## 公司级npm用法
基于 [sinopia](https://github.com/rlidwka/sinopia) 搭建

## 开始使用
安装[node](https://nodejs.org/en/)

建议安装[nrm](https://github.com/Pana/nrm) 来管理npm镜像

点击访问[公司级npm](http://192.168.201.166:4873/)

使用方法
> 使用人员
```bash
# 安装 nrm
$ npm install nrm -g

# 增加公司级npm镜像地址
$ nrm add sinopia http://192.168.201.166:4873/

# 切换到公司级npm镜像
$ nrm use sinopia

# 切换到项目文件，安装
$ cd project && npm install
```
> 开发人员
```bash
# 首先参照 使用人员 切换公司级npm镜像地址

# 登陆（如果没有账号的话，请联系公司级npm管理员创建）
$ npm login  // 输入用户名 密码 邮箱

# 切换到项目文件，发布包到 npm 服务器
$ cd project && npm publish
```