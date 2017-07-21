import React, { Component, PropTypes } from 'react';
import {Table, Pagination} from 'antd';
import objectAssign from 'object-assign';
import cx from 'classnames';

/**
 * 数据表格
 */
class DataTable extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    rowKey: PropTypes.string,
    /**
     * 详见帮助文档 column.js 用法
     */
    columns: PropTypes.array.isRequired, 
    /**
     * 数据对像dataList为必需,如需表格自带分页需要在此提供分页信息 {currentPage:1, dataList:[], paramMap:{}, showCount:10, totalResult:12}
     */
    dataItems: PropTypes.object.isRequired, 
    /**
     * 是否显示行序号
     */
    showNum: PropTypes.bool,
    /**
     * 是否奇偶行不同颜色
     */
    alternateColor: PropTypes.bool,
    /**
     * 多选/单选，checkbox 或 radio
     */
    selectType: PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    /**
     * 选择功能的配置 参考antd的rowSelection配置项
     */
    rowSelection: PropTypes.object,
    /**
     * 指定选中项的 key 数组
     */
    selectedRowKeys: PropTypes.array,
    /**
     * 是否带滚动条
     */
    isScroll: PropTypes.bool,
    /**
     * 是否增加表格内分页
     */
    pagination: PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    /**
     * 选中表格行回调 function(selectedRowKeys, selectedRows)
     */
    onSelect: PropTypes.func,
    /**
     * 外部获取数据接口 {currentPage:1, paramMap:{}, showCount:10}
     */
    onChange: PropTypes.func,
  }

  static defaultProps = {
    prefixCls: "antui-datatable",
    alternateColor: true
  }

  constructor(props) {
    super(props);
    
    this.state = {
      selectedRowKeys: this.getSelectedRowKeys(props),
      selectedRows: [],
      tableHeight: null,
    };
  }

  getSelectedRowKeys(props) {
    let selectedRowKeys = [];
    if ('selectedRowKeys' in props) {
      selectedRowKeys = props.selectedRowKeys;
    }
    return selectedRowKeys;
  }

  componentWillReceiveProps(nextProps) {
    const selectedRowKeys = this.getSelectedRowKeys(nextProps);
    const st = {};

    if (selectedRowKeys) {
      st.selectedRowKeys = selectedRowKeys;
    }

    if (Object.keys(st).length) this.setState(st);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.dataItems.dataList.length === 0) {
      nextState.selectedRowKeys = [];
      nextState.selectedRows = [];
    }
  }

  tableRowClick = (record, index, e) => {
    const {selectType} = this.props;

    let keys = selectType === "radio" ? [] : (this.state.selectedRowKeys || []);
    let rows = selectType === "radio" ? [] : (this.state.selectedRows || []);
    
    let i = keys.indexOf(record[this.props.rowKey]);
    if (i !== -1) {
      keys.splice(i, 1);
      rows.splice(i, 1);
    } else {
      keys.push(record[this.props.rowKey]);
      rows.push(record);
    }
    
    this.onSelectChange(keys, rows);
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
    this.props.onSelect && this.props.onSelect(selectedRowKeys, selectedRows);
  }

  handleTableChange = (pagination, filters, sorter) => {
    let currentPage = pagination.current || pagination;

    let sortMap = sorter.field ? {
      [sorter.field]: sorter.order === 'ascend' ? 'asc' : 'desc'
    } : null;
    this.props.onChange({currentPage, filters, sorter: sortMap});
  }

  onShowSizeChange = (currentPage, showCount) => {
    this.props.onChange({currentPage, showCount});
  }

  render() {
    const {prefixCls, className, columns, dataItems, showNum, alternateColor,
      selectType, rowSelection, isScroll, pagination, ...otherProps} = this.props;

    let classname = cx(
      prefixCls, 
      className, 
      {"table-row-alternate-color": alternateColor},
    );

    // 默认宽度
    let xwidth = 0;
    let cols = columns.filter((col) => {
      if (col.tableItem) {
        xwidth += col.width || 120; 
        return true;
      } else {
        return false;
      }
    }).map((col) => {
      let item = col.tableItem;
      // select 字典加强
      if (col.dict && !item.render) {
        item.render = (text, record) => {
          return col.dict && col.dict.filter(dic => dic.code === text).map(dic => dic.codeName)[0];
        };
      }
      return {
        title: col.title,
        dataIndex: col.name,
        ...item
      };
    });

    // 显示行号
    if (showNum) {
      cols.unshift({
        title: '序号',
        width: 50,
        dataIndex: '_num',
        render (text, record, index) {
          return index + 1;
        } 
      });
    }

    // 分页
    const paging = {
      showSizeChanger: true,
      showQuickJumper: true,
      total: dataItems.totalResult,
      pageSize: dataItems.showCount,
      current: dataItems.currentPage,
      defaultCurrent: dataItems.currentPage,
      showTotal: total => `共 ${total} 条`,
      onShowSizeChange: this.onShowSizeChange,
      ...pagination
    };

    const _rowSelection = {
      type: selectType === "radio" ? "radio" : "checkbox",
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
      ...rowSelection
    };

    return (
      <div className={classname}>
        <Table 
          size="small"
          rowSelection={selectType ? _rowSelection : null}
          onRowClick={selectType ? this.tableRowClick : () => {}}
          scroll={isScroll ? objectAssign({x: xwidth}, {y: this.state.tableHeight}) : {}}
          columns={cols}
          pagination={pagination ? paging : false}
          dataSource={dataItems.dataList}
          onChange={this.handleTableChange}
          {...otherProps}
        />
      </div>
    );
  }
}

/**
 * 操作区
 */
const Oper = (prop) => (
  <div className="table-row-button" onClick={e => e.stopPropagation()}>
    {prop.children}
  </div>
);

const Paging = ({dataItems, onChange, ...otherProps}) => {
  const { totalResult, showCount, currentPage } = dataItems;
  const paging = {
    total: totalResult,
    pageSize: showCount,
    current: currentPage,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    onShowSizeChange: (currentPage, showCount) => onChange({currentPage, showCount}),
    onChange: (currentPage) => onChange({currentPage}),
    ...otherProps
  };
  return <Pagination {...paging} />;
};

DataTable.Oper = Oper;
DataTable.Pagination = Paging;

export default DataTable;