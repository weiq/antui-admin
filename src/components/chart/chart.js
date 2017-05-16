import echarts from 'echarts/lib/echarts';
import PropTypes from 'prop-types';
import React from 'react';
import elementResizeEvent from 'element-resize-event';

/**
 *  图形组件，基于echart3
 */
export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.echartsElement = null; // echarts div element
  }

  static propTypes = {
    /** 图形配置, 详见 http://echarts.baidu.com/option.html#title. */
    option: PropTypes.object.isRequired,
    /** 样式 */
    style: PropTypes.object,
    /** 事件监听，详见 http://echarts.baidu.com/api.html#events */
    onEvents: PropTypes.object,
  };

  static defaultProps = {
    style: {height: 300},
    onEvents: {}
  }
  // first add
  componentDidMount() {
    const echartObj = this.renderEchartDom();
    const onEvents = this.props.onEvents;

    this.bindEvents(echartObj, onEvents);
    // on chart ready
    // on resize
    elementResizeEvent(this.echartsElement, () => {
      echartObj.resize();
    });
  }

  // update
  componentDidUpdate() {
    this.renderEchartDom();
    this.bindEvents(this.getEchartsInstance(), this.props.onEvents || []);
  }

  // remove
  componentWillUnmount() {
    if (this.echartsElement) {
      // if elementResizeEvent.unbind exist, just do it.
      if (typeof elementResizeEvent.unbind === 'function') {
        elementResizeEvent.unbind(this.echartsElement);
      }
      echarts.dispose(this.echartsElement);
    }
  }
  // return the echart object
  getEchartsInstance = () => echarts.getInstanceByDom(this.echartsElement) ||
  echarts.init(this.echartsElement);

  // bind the events
  bindEvents = (instance, events) => {
    const _loopEvent = (eventName) => {
      // ignore the event config which not satisfy
      if (typeof eventName === 'string' && typeof events[eventName] === 'function') {
        // binding event
        instance.off(eventName);
        instance.on(eventName, (param) => {
          events[eventName](param, instance);
        });
      }
    };

    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _loopEvent(eventName);
      }
    }
  };

  // render the dom
  renderEchartDom = () => {
    // init the echart object
    const echartObj = this.getEchartsInstance();
    // set the echart option
    echartObj.setOption(this.props.option);

    return echartObj;
  };

  render() {
    return (
      <div ref={(e) => { this.echartsElement = e; }} style={this.props.style} />
    );
  }
}