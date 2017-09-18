import React from 'react';
import {Input} from 'antd';
/**
 * 文本框元件
 */
export default ({form, name, formFieldOptions = {}, record, initialValue, rules, onChange, preview, ...otherProps}) => {
  const { getFieldDecorator } = form;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // 如果存在初始值
  if (initval !== null && typeof (initval) !== "undefined") {
    formFieldOptions.initialValue = initval;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === "function") {
    formFieldOptions.onChange = (e) => onChange(form, e.target.value, e); // form, value, event
  }

  return preview ? initval : getFieldDecorator(name, formFieldOptions)(
    <Input {...otherProps} />
  );
};