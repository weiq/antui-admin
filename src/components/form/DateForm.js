import React from 'react';
import {DatePicker, TimePicker} from 'antd';
import objectAssign from 'object-assign';
const { MonthPicker, RangePicker } = DatePicker;
/**
 * 日期，时间元件
 */
export default ({name, form, type, record, initialValue, rules, formFieldOptions = {}, ...otherProps}) => {
  const { getFieldDecorator } = form;
  
  // 如果存在初始值
  if (record && record[name] || initialValue) {
    formFieldOptions.initialValue = record && record[name] || initialValue;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  let Component = DatePicker;
  let format = "";

  switch (type) {
    case 'date':
    case 'datetime':
      break;
    case 'date~':
      Component = RangePicker;
      break;
    case 'monthDate':
      Component = MonthPicker;
      break;
    case 'time':
      Component = TimePicker;
      break;
  }
  
  if (type === 'datetime' || type === 'date~') format = "YYYY-MM-DD HH:mm:ss";
  else if (type === 'time') format = "HH:mm:ss";
  else format = "YYYY-MM-DD";

  return getFieldDecorator(name, formFieldOptions)(
    <Component {...objectAssign({format}, otherProps)} />
  );
};