import React, { PropTypes } from 'react';
import Icon from '../icon';
import { Timeline, Card } from 'antd';
import cx from 'classnames';

/** 垂直展示的时间流信息 */
class TimeLine extends React.Component {
  static propTypes = {
    /** 数据数组 */
    dataSource: PropTypes.array.isRequired,
    /** 最后一个时间节点的内容 */
    pending: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    /** 时间节点的位置 */
    placement: PropTypes.string
  };

  static defaultProps = {
    placement: "bottom"
  };

  render() {
    const { dataSource, placement, pending } = this.props;

    const dot = (icon, color, time) => (
      <div className="antui-timeline-stat">
        <div className="antui-timeline-stat-icon">
          <Icon type={icon} style={{color: color}} />
        </div>
        {placement === 'bottom' ? <div className="antui-timeline-stat-time">{time}</div> : null}
      </div>
    );

    const nodot = (color, time) => (
      <div className="antui-timeline-stat">
        <div className="antui-timeline-stat-circle" style={{borderColor: color}} />
        {placement === 'bottom' ? <div className="antui-timeline-stat-time">{time}</div> : null}
      </div>
    );

    const timelineClass = cx({
      'antui-timeline': true,
      'antui-timeline-left': placement === 'left',
    });

    return (
      <div className={timelineClass}>
        <Timeline pending={pending}>
          {
            dataSource.map(({ icon, color = '#c9c9c9', time, border = true, title, message, onClick = _ => false }, index) => (
              <Timeline.Item key={`antui_timeline_item_${index}`} dot={icon ? dot(icon, color, time) : nodot(color, time)}>
                {placement === 'left' ? <div className="antui-item-time">{time}</div> : null}
                <Card bordered={border} onClick={onClick}>
                  {title ? <div className="antui-content-title">{title}</div> : null}
                  <div className={`antui-content-message ${title ? '' : 'antui-content-message-notitle'}`}>{message}</div>
                </Card>
              </Timeline.Item>
            ))
          }
        </Timeline>
      </div>
    );
  }
};

export default TimeLine;