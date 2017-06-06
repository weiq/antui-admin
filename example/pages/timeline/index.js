import React from 'react';
import { TimeLine } from '../../../src';
import Page from '../../component/page';

export default class TimeLineDemo extends React.Component {

  render() {
    return (
      <Page title="TimeLine" subTitle="时间轴" desc="垂直展示的时间流信息">
        <nav>
          <h2>代码演示</h2>
          <h3>最简单的使用</h3>
          <code>
            <TimeLine {...props1} />
          </code>
          <h3>自定义图标</h3>
          <code>
            <TimeLine {...props2} />
          </code>
          <h3>不显示边框</h3>
          <code>
            <TimeLine {...props3} />
          </code>
          <h3>时间节点的位置为 left</h3>
          <code>
            <TimeLine {...props4} />
          </code>
          <h3>显示最后一个时间节点</h3>
          <code>
            <TimeLine {...props5} />
          </code>
          <h3>时间节点click事件</h3>
          <code>
            <TimeLine {...props6} />
          </code>
        </nav>
      </Page>
    );
  }
};

const props1 = {
  dataSource: [
    {
      "time": "11:00",
      "title": "下单",
      "message": "您从美团外卖下单"
    },
    {
      "time": "11:05",
      "title": "商家接单",
      "message": "商家确认您的订单"
    },
    {
      "time": "11:35",
      "title": "骑手取餐",
      "message": "骑手已经取到餐啦"
    },
  ]
};

const props2 = {
  dataSource: [
    {
      "icon": "shopping-cart",
      "color": "red",
      "time": "11:00",
      "title": "下单",
      "message": "您从美团外卖下单"
    },
    {
      "icon": "refund",
      "time": "11:05",
      "color": "orange",
      "title": "商家接单",
      "message": "商家确认您的订单"
    },
    {
      "icon": "car",
      "time": "11:35",
      "color": "blue",
      "title": "骑手取餐",
      "message": "骑手已经取到餐啦"
    },
  ]
};

const props3 = {
  dataSource: [
    {
      "icon": "shopping-cart",
      "color": "red",
      "time": "11:00",
      "border": false,
      "title": "下单",
      "message": "您从美团外卖下单"
    },
    {
      "icon": "refund",
      "time": "11:05",
      "border": false,
      "color": "orange",
      "title": "商家接单",
      "message": "商家确认您的订单"
    },
    {
      "icon": "car",
      "time": "11:35",
      "border": false,
      "color": "blue",
      "title": "骑手取餐",
      "message": "骑手已经取到餐啦"
    },
  ]
};

const props4 = {
  placement: "left",
  dataSource: [
    {
      "icon": "shopping-cart",
      "color": "red",
      "time": "2017-06-02 11:00:35 AM",
      "title": "下单",
      "message": "您从美团外卖下单"
    },
    {
      "icon": "refund",
      "time": "2017-06-02 11:05:23 AM",
      "color": "orange",
      "title": "商家接单",
      "message": "商家确认您的订单"
    },
    {
      "icon": "car",
      "time": "2017-06-02 11:35:06 AM",
      "color": "blue",
      "title": "骑手取餐",
      "message": "骑手已经取到餐啦"
    },
  ]
};

const props5 = {
  ...props2,
  pending: "大约10分钟左右送达，请耐心等待"
};

const props6 = {
  placement: "left",
  dataSource: [
    {
      "icon": "shopping-cart",
      "color": "red",
      "time": "2017-06-02 11:00:35 AM",
      "title": "下单",
      "message": "您从美团外卖下单",
      "onClick": () => {
        alert("您从美团外卖下单");
      }
    },
    {
      "icon": "refund",
      "time": "2017-06-02 11:05:23 AM",
      "color": "orange",
      "title": "商家接单",
      "message": "商家确认您的订单",
      "onClick": () => {
        alert("您从美团外卖下单");
      }
    },
    {
      "icon": "car",
      "time": "2017-06-02 11:35:06 AM",
      "color": "blue",
      "title": "骑手取餐",
      "message": "骑手已经取到餐啦",
      "onClick": () => {
        alert("您从美团外卖下单");
      }
    },
  ]
};
