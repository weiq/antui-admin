import React from 'react';
import { Chart } from '../../../src';
import Page from '../../component/page';
// chart import demand
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/tooltip';

class ChartDemo extends React.Component {

  render() {
    const barOption = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    const pieOption = {
      title: {
        text: '饼型图',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['张三', '李四', '王五']
      },
      series: [
        {
          name: '工作量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value: 335, name: '张三'},
            {value: 310, name: '李四'},
            {value: 234, name: '王五'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    const onEvents = {
      click: ({name, seriesName, value, percent}) => {
        alert(`${name}的${seriesName}为${value}, 占比为${percent}%`);
      }
    };

    return (
      <Page title="Chart" subTitle="图形组件" desc="图形组件，基于echart3">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Chart option={barOption} style={{width: '100%', height: 300}} />
          </code>
          <h3>2. 事件监听事例</h3>
          <code>
            <Chart option={pieOption} style={{width: '100%', height: 300}} onEvents={onEvents} />
          </code>
        </nav>
      </Page>
    );
  }
};

export default ChartDemo;