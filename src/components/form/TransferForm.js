import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transfer, Modal, Button } from 'antd';

class TransferControlled extends Component {
  static propTypes = {
    value: PropTypes.array,
    dataSource: PropTypes.array,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    const {value, dataSource, ...otherProps} = props;
    this.state = {
      value: value,
      dataSource: dataSource,
      visible: false,
    };
    this.otherProps = otherProps;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  triggerChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ value: nextTargetKeys });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(nextTargetKeys);
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const {dataSource, value} = this.state;
    
    const comp = <Transfer
      {...this.otherProps}
      dataSource={dataSource}
      titles={['源', '目标']}
      targetKeys={value}
      onChange={this.triggerChange}
      render={item => item.title || item.label}
    />;

    if (this.otherProps.modal) {
      return (
        <div>
          <Button onClick={this.showModal}>请选择{this.otherProps.title}</Button>
          <Modal
            title={"请选择" + this.otherProps.title}
            visible={this.state && this.state.visible}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText="确定"
            cancelText="取消"
            {...this.otherProps.modal}
          >
            {comp}
          </Modal>
        </div>
      );
    }
    
    return comp;
  }
}

/**
 * TransferForm组件
 */

export default ({form, name, dict, formFieldOptions = {}, record, initialValue, rules, onChange, dataSource, ...otherProps}) => {
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
    <TransferControlled dataSource={dataSource} {...otherProps} />
  );
};