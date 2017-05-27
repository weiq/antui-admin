
## Header
顶部容器，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中

> 组件属性

名称 | 类型 | 默认 | 具体
----|------|-----|----
border | enum('top','bottom')  |  | 是否显示上下边框
justify | string  | `start` | flex 布局下的水平排列方式：start end center space-around space-between
align | string  | `top` | flex 布局下的垂直对齐方式：top middle bottom
size | enum('small')  |  | Header组件尺寸 
transparent | boolean  | `false` | 背景是否透明

## Sider
侧边容器，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中

> 组件属性

名称 | 类型 | 默认 | 具体
----|------|-----|----
collapsible | boolean  | `false` | 是否可收起
width | number  | `200` | 宽度

## Drawer
抽屉容器，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中

> 组件属性

名称 | 类型 | 默认 | 具体
----|------|-----|----
visible | boolean  | `false` |用于手动控制抽屉显隐
width | number  | `360` | 宽度
placement | string  | `right` | 抽屉位置，可选 top left right bottom


## Content
内容容器，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中

> 组件属性

名称 | 类型 | 默认 | 具体
----|------|-----|----
padding | number|string  |  | 内边距


## Footer
底部容器，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中

> 组件属性

名称 | 类型 | 默认 | 具体
----|------|-----|----
border | enum('top','bottom')  |  | 是否显示上下边框
justify | string  | `start` | flex 布局下的水平排列方式：start end center space-around space-between
align | string  | `top` | flex 布局下的垂直对齐方式：top middle bottom
size | enum('small')  |  | Footer组件尺寸

