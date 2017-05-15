import React from 'react';
import {Input} from 'antd';

export default ({form, field, options, ...otherProps}) => {
  const { getFieldDecorator } = form;

  return getFieldDecorator(field.name, options)(
    <Input {...otherProps} />
  );
};