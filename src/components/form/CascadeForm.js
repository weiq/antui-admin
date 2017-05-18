import React from 'react';
import {Cascader} from 'antd';

/**
 * 级联表单元件
 * initialValue 初始值
 */
export const CascadeForm = ({name, form, record, formFieldOptions = {}, initialValue, rules, onChange, ...otherProps}) => {
  const { getFieldDecorator } = form;
  
  // 如果存在初始值
  if (record && record[name] || initialValue) {
    formFieldOptions.initialValue = record && record[name] || initialValue;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === "function") {
    formFieldOptions.onChange = (value, selectedOptions) => onChange(form, value, selectedOptions); // form, value, selectedOptions
  }

  return getFieldDecorator(name, formFieldOptions)(
    <Cascader {...otherProps} />
  );
};

export default CascadeForm;