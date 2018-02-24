import React from 'react';
import {Select} from 'antd';
/**
 * 下拉菜单元件
 */
export default ({form, name, dict, formFieldOptions = {}, record, initialValue, rules, onChange, ...otherProps}) => {
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
    formFieldOptions.onChange = value => onChange(form, value); // form, value
  }

  return getFieldDecorator(name, formFieldOptions)(
    <Select {...otherProps}>
      {
        dict.map((dic, i) =>
          <Select.Option key={dic.code} value={dic.code} title={dic.codeName}>{dic.codeName}</Select.Option>
        )
      }
    </Select>
  );
};