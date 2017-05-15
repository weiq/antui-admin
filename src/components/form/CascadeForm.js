import React from 'react';
import {Cascader} from 'antd';

export default ({form, field, options, ...otherProps}) => {
  const { getFieldDecorator } = form;

  return getFieldDecorator(field.name, options)(
    <Cascader options={field.treeData} {...otherProps} />
  );
};