import React from 'react';
import {Form, Button, Input, Select, Cascader, DatePicker, TreeSelect} from 'antd';
// import notify from '../Notify';
import moment from 'moment';

const Option = Select.Option;

import './style.less';

const createForm = Form.create;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

/**
 * 简单查询功能
 * fields={
        name: ...,
        type: 'Input',
        placeholder: ...,
        width: ...,
   }
 */
class SearchBar extends React.Component {
  static propTypes = {
    form: React.PropTypes.any,
    columns: React.PropTypes.array.isRequired,
    className: React.PropTypes.string,
    onOk: React.PropTypes.func,
    inline: React.PropTypes.bool,
    searchable2: React.PropTypes.bool,
    append: React.PropTypes.any
  }

  state = {
    startDateValue: null,
    endDateValue: null,
  }
    
  resetForm(e) {
    this.props.form.resetFields();
    this.searchForm(true);

    const {startDateValue, endDateValue} = this.state;
    if (startDateValue || endDateValue) {
      this.setState({
        startDateValue: null,
        endDateValue: null,
      });
    }
  }
    
  searchForm(isReset) {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        let errs = [];
        Object.keys(errors).forEach(fieldName => {
          errs = errors[fieldName].errors || [];
        });
        if (errs && errs.length) {
          // notify.error(errs[0].message);
        }
        return;
      }
      
      this.props.onOk(values, isReset);
    });
  }

  // start date //////////
  disabledStartDate = (startDateValue) => {
    if (!startDateValue || !this.state.endDateValue) {
      return false;
    }
    return startDateValue >= this.state.endDateValue;
  }

  disabledEndDate = (endDateValue) => {
    if (!endDateValue || !this.state.startDateValue) {
      return false;
    }
    return endDateValue <= this.state.startDateValue;
  }

  onStartDateChange = (value) => {
    this.setState({
      startDateValue: value,
    });
  }

  onEndDateChange = (value) => {
    this.setState({
      endDateValue: value,
    });
  }

  setFieldsValue = (value) => {
    this.props.form.setFieldsValue(value);
  }

  renderDate = (field) => {
    const { getFieldProps } = this.props.form;

    let props = {
      style: {width: field.searchWidth || field.width || 120},
      allowClear: field.allowClear,
    };
    let fieldProps = {};

    if (field.start) {
      props.disabledDate = this.disabledStartDate;
      fieldProps.onChange = this.onStartDateChange;
      fieldProps.value = this.state.startDateValue;
      props.placeholder = field.placeholder || "开始日期";
    }

    if (field.end) {
      props.disabledDate = this.disabledEndDate;
      fieldProps.onChange = this.onEndDateChange;
      fieldProps.value = this.state.endDateValue;
      props.placeholder = field.placeholder || "结束日期";
    }
    
    if (field.value) {
      fieldProps.initialValue = moment(field.value);
      if (field.start) this.state.startDateValue = moment(field.value);
      if (field.end) this.state.endDateValue = moment(field.value);
    }
    
    return <DatePicker
      {...getFieldProps(field.name, {
        ...fieldProps
      })}
      {...props}
    />;
  }

  // end date ///
    
  render () {
    const {columns, inline, append, searchable2} = this.props;
        
    const { getFieldProps, setFieldsValue } = this.props.form;

    let searchFields = searchable2 ? columns.filter(col => col.searchable2) 
      : columns.filter(col => col.searchable);

    searchFields = searchFields || [];

    let fields = searchFields.map(field => {
      const {type, dict, dataIndex, title, treeData, onChange, ...other} = field;
      return {
        type: type || 'input',
        dict: dict || [],
        name: dataIndex, 
        placeholder: title,
        treeData: treeData || [],
        onChange: onChange,
        ...other
      };
    });
        
    return (
      <div className={inline ? "search-from-inline" : "search-form"}>
        {searchFields && searchFields.length > 0 ? (
          <Form>
            {
              fields.map((field, i) => {
                switch (field.type) {
                  case 'date':
                    return (
                      <span className="search-item-s" key={field.name + "_key"}>
                        {inline ? null : <span className="search-item-label">{field.placeholder + "："}</span>}
                        {this.renderDate(field)}
                      </span>
                    );
                  case 'date~' : 
                    return (
                      <span className="search-item-s" key={field.name + "_key"}>
                        {inline ? null : <span className="search-item-label">{field.placeholder + "："}</span>}
                        <input type="hidden" {...getFieldProps(field.name[0])} />
                        <input type="hidden" {...getFieldProps(field.name[1])} />
                        <RangePicker
                          disabled={field.disabled} 
                          readOnly={field.readOnly} 
                          style={{width: field.searchWidth || field.width || 200}}
                          {...getFieldProps(field.name[0] + "_" + field.name[1], {
                            onChange: field.onChange 
                              ? (date, dateString) => field.onChange(date, dateString, this.props.form, field)
                              : (value, dateString) => {
                                setFieldsValue({
                                  [field.name[0]]: value[0],
                                  [field.name[1]]: value[1],
                                  [field.name[0] + "_" + field.name[1]]: value
                                });
                              }
                          })}
                        />
                      </span>
                    );
                  case 'monthDate' :
                    let format = field.format || "YYYY-MM";
                    let fieldProps = {};
                    if (field.value) {
                      fieldProps.initialValue = moment(field.value, format);
                    }
                    return (
                      <span className="search-item-s" key={field.name + "_key"}>
                        {inline ? null : <span className="search-item-label">{field.placeholder + "："}</span>}
                        <MonthPicker 
                          {...getFieldProps(field.name, {
                            onChange: field.onChange ? (value) => field.onChange(value, this.props.form) : undefined,
                            ...fieldProps
                          })}
                          placeholder={field.placeholder || '请输入查询条件'}
                          format={format}
                          allowClear={field.allowClear} 
                        />
                      </span>
                    );
                  case 'cascade':
                  case 'cascader':
                    return (
                      <span className="search-item-s" key={field.name + "_key"}>
                        {inline ? null : <span className="search-item-label">{field.placeholder + "："}</span>}
                        <Cascader 
                          className={inline ? "search-item-inline" : "search-item"}
                          disabled={field.disabled} 
                          options={field.treeData}
                          style={{width: field.searchWidth || field.width || 150}}
                          placeholder={field.placeholder || '请输入查询条件'}
                          showSearch
                          notFoundContent="空"
                          changeOnSelect
                          {...getFieldProps(field.name, {
                            onChange: field.onChange ? (value, selectedOptions) => field.onChange(value, selectedOptions) : undefined
                          })} 
                        />
                      </span>
                    );
                  case 'select' :
                    return (
                      <span className="search-item-s" key={field.name + "_key"}>
                        {inline ? null : <span className="search-item-label">{field.placeholder + "："}</span>}
                        <Select
                          {...getFieldProps(field.name, {
                            onChange: field.onChange ? (value) => field.onChange(value, this.props.form) : undefined
                          })}
                          allowClear
                          showSearch
                          optionFilterProp="children"
                          style={{width: field.searchWidth || field.width || 100}}
                          dropdownClassName="search-form-select-dropdown"
                          notFoundContent="空"
                          className={inline ? "search-item-inline" : "search-item"}
                          placeholder={field.placeholder || '请输入查询条件'}
                          >
                          {
                            field.dict.map((dic, i) =>
                              <Option key={dic.code} value={dic.code} title={dic.codeName}>{dic.codeName}</Option>
                            )
                          }
                        </Select>
                      </span>
                    );
                  case 'treeSelect' :
                    return (
                      <span className="search-item-s" key={field.name + "_key"}>
                        {inline ? null : <span className="search-item-label">{field.placeholder + "："}</span>}
                        <TreeSelect
                          {...getFieldProps(field.name, {
                            onChange: field.onChange ? (value) => field.onChange(value, this.props.form) : undefined
                          })}
                          allowClear
                          style={{ width: field.searchWidth || field.width || 220 }}
                          dropdownStyle={{ maxHeight: 220, overflow: 'auto' }}
                          treeData={field.treeData}
                          placeholder={field.placeholder || '请输入查询条件'}
                          treeDefaultExpandAll
                        />
                      </span>
                    );
                  default :
                    return (
                      <span className="search-item-s" key={field.name + "_key"}>
                        {inline ? null : <span className="search-item-label">{field.placeholder + "："}</span>}
                        <Input 
                          {...getFieldProps(field.name, {
                            rules: [{
                              pattern: /^[^'_%&<>=?*!]*$/,
                              message: '查询条件中不能包含特殊字符'
                            }]
                          })}
                          style={{width: field.searchWidth || field.width || 100}}
                          className={inline ? "search-item-inline" : "search-item"}
                          placeholder={field.placeholder || '请输入查询条件'}
                          maxLength={field.maxLength || "100"}
                        />
                      </span>
                    ); 
                }
              })
            }
            {append}
            {
              inline ? (
                <Button.Group className="search-form-btn-inline">
                  <Button 
                    title="查询"
                    onClick={e => ::this.searchForm()}  
                    htmlType="submit"
                    icon="search"
                  />
                  <Button 
                    title="重置"
                    onClick={e => ::this.resetForm()}
                    icon="reload"
                  />
                </Button.Group>
              ) : (
                <div className="search-form-btn">
                  <Button 
                    title="查询"
                    type="primary"
                    onClick={e => ::this.searchForm()}  
                    htmlType="submit"
                    icon="search"
                  >查询</Button>
                  <Button 
                    title="重置"
                    onClick={e => ::this.resetForm()}
                    icon="reload"
                  >重置</Button>
                </div>
              )
            }
          </Form>
          )
          : null
        }
      </div>
    );
  }
}

export default createForm()(SearchBar);