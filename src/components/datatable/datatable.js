import React, { Component, PropTypes } from 'react';
import {Table} from 'antd';
import cx from 'classnames';

class DataTable extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: "antui-datatable",
  }

  render() {
    const {prefixCls, className, ...otherProps} = this.props;
    let classname = cx(prefixCls, className);
    return (
      <div className={classname}>
        <Table 
          size="small"
          {...otherProps}
        />
      </div>
    );
  }
}

export default DataTable;