import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './style.less';

/**
 *  Icon
 */
export default class Icon extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    spin: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    iconFace: PropTypes.string
  }

  render() {
    const { type, className = '', children, spin, ...props } = this.props;
    const classString = classNames({
      iconfont: true,
      'iconfont-spin': !!spin || type === 'loading',
      [`iconfont-${type}`]: true,
    }, className);
    return <i className={classString} {...props}>{children}</i>;
  }
}