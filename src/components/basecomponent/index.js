import React, {PropTypes} from 'react';
import {Session, Application} from '../../utils/storage';
import Modal from '../modal';
import message from '../message';
import objectAssign from 'object-assign';
import dict from '../../utils/dict';

/**
 * React组件基类，增加事件函数的支持，可以避免多层组件层层传递的情况，
 * 即在一个组件中注册事件，在任意组件中触发注册的事件即可。
 */
class BaseComponent extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    ui: PropTypes.object,
  };

  constructor(props) {
    super();
    // 
    this.session = Session;
    this.application = Application;
    this.options = props;
    //
    this.message = message;

    this.enabledBtns = this._getEnabledBtns();
  }

  /**
   * 反回按钮权限
   * @return <Array> btns
   */
  _getEnabledBtns() {
    let url2resId = this.session.getAttribute("url2resId");
    let resId = url2resId && url2resId[location.pathname.split("/")[1]];
    let opers = this.session.getAttribute("opers");
    if (resId && opers && opers[resId + ""]) {
      return opers[resId + ""];
    }
    return [];
  }

  /**
   * 点击表格中的行时的回调
   * @param keys 行key数组
   * @param rows 行数据数组
   */
  onSelect = (keys, selectRows) => {
    this.setState({
      selectRows
    });
  }

  /**
   * 按钮通过这个方法反回是否有权限
   */
  hasBtnPermission = (btnName) => {
    return !!btnName && this.enabledBtns.indexOf(btnName) !== -1;
  }

  onFetchData = ({currentPage, sortMap, paramMap, showCount}, fetchFunction) => {
    let obj = {};
    if (sortMap) obj.sortMap = sortMap;
    if (paramMap) obj.paramMap = paramMap;
    if (showCount) obj.showCount = showCount;
    if (currentPage) obj.currentPage = currentPage;

    if (this.options && this.options.defaultParamMap) {
      obj.paramMap = objectAssign({}, this.options.defaultParamMap, obj.paramMap || this.paramData.paramMap);
    }

    let _p = objectAssign(this.paramData, obj);

    this.fetchFunction = this.fetchFunction || fetchFunction;
    
    return this.fetchFunction && this.fetchFunction(_p);
  }

  getPaging(items, options = {}) {
    return {
      showSizeChanger: true,
      showQuickJumper: true,
      total: items.totalResult,
      pageSize: items.showCount,
      current: items.currentPage,
      defaultCurrent: items.currentPage,
      showTotal: total => `共 ${total} 条`,
      pageSizeOptions: options.pageSizeOptions || ['10', '20', '50', '100'],
      onShowSizeChange: (currentPage, showCount) => this.onFetchData({currentPage, showCount}),
      onChange: (pagination, filters, sorter) => {
        let currentPage = pagination.current || pagination;
        this.onFetchData({currentPage});
      }
    };
  }
   
  /**
   * 阻止冒泡及默认行为
   */
  nopopup(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  _modal(type = "info", content = "", options = {}) {
    Modal[type]({
      content,
      ...options
    });
  }

  /**
   * 提示框组件
   */
  alert(content = "", options) {
    options = objectAssign({}, {title: "通知", onOk() {}}, options);
    return this._modal("info", content, options);
  }

  /**
   * 提示框组件
   */
  info(args) {
    return this.alert(args);
  }

  /**
   * 提示框组件
   */
  warn(content = "", options) {
    options = objectAssign({}, {title: "警告", onOk() {}}, options);
    return this._modal("warning", content, options);
  }

  /**
   * 提示框组件
   */
  success(content = "", options) {
    options = objectAssign({}, {title: "成功", onOk() {}}, options);
    return this._modal("success", content, options);
  }

  /**
   * 提示框组件
   */
  error(content = "", options) {
    options = objectAssign({}, {title: "错误", onOk() {}}, options);
    return this._modal("error", content, options);
  }

  /**
   * 提示框组件
   */
  confirm(content = "", options) {
    options = objectAssign({}, {title: "确认", onOk() {}, onCancel() {}}, options);
    return this._modal("confirm", content, options);
  }

  /**
   * 弹窗组件 options 参考antd Modal配置
   */
  showModal(content, options) {
    this.context.ui.showModal(content, options);
  }

  /**
   * 跟据字典类型获取字典值对象
   * return [{code: aa, codeName: aa}, {code: bb, codeName: bb}]
   * 例 this.getDict("1001"));
   */
  getDict(type) {
    return dict.get(type);
  }

  /**
   * 跟据字典类型与字典值获取对应的名称
   * return string
   * 例 this.getDictName("1001", "1001001")
   */
  getDictName(codeType, codeValue) {
    return dict.getDictName(codeType, codeValue);
  }
}

export default BaseComponent;