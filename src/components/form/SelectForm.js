import React from 'react';
import {Select} from 'antd';

export default ({form, field, options, ...otherProps}) => {
  const { getFieldDecorator } = form;

  return getFieldDecorator(field.name, {
    onChange: field.onChange ? (value) => field.onChange(value, this.props.form) : undefined,
    ...options
  })(
    <Select
      notFoundContent="空"
      {...otherProps}
      >
      {
        field.dict.map((dic, i) =>
          <Select.Option key={dic.code} value={dic.code} title={dic.codeName}>{dic.codeName}</Select.Option>
        )
      }
    </Select>
  );
};