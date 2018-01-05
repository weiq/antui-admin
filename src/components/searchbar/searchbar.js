import React, {PropTypes} from 'react';
import {Form, Row, Col, Button, message} from 'antd';
import cx from 'classnames';
import objectAssign from 'object-assign';
import {InputForm, SelectForm, DateForm, CascadeForm, TreeSelectForm, CustomForm, InputNumberForm} from '../form';
const createForm = Form.create;

const PlainComp = ({className, children}) => <div className={className}>{children}</div>;
PlainComp.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
/**
 * 搜索条
 */
class SearchBar extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    /**
     * 详见帮助文档 column.js 用法
     */
    columns: PropTypes.array.isRequired, 
    /**
     * 搜索条类型 inline(行内)，grid(栅格)
     */
    type: PropTypes.string,
    /**
     * 搜索条件分组，设置这个属性后，会在column.js中过滤有相同group值的搜索项
     */
    group: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    /**
     * 同antd中Grid组件中的Row配置
     */
    rows: PropTypes.object,
    /**
     * 同antd中Grid组件中的Col配置
     */
    cols: PropTypes.object,
    /**
     * 额外搜索项
     */
    children: PropTypes.node,

    form: PropTypes.object,

    /**
     * 点击查询按钮 onSearch(values, isReset) values 查询数据 isReset 是否是重置
     */
    onSearch: PropTypes.func,
  }

  static defaultProps = {
    prefixCls: "antui-searchbar",
    type: "inline",
  }

  // 当type为grid时，指定每行元素个数
  cols = {
    xs: 8,
    md: 6,
    xl: 4
  };

  // 内联元素默认宽
  width = {
    'date': 100,
    'monthDate': 100,
    'date~': 280,
    'datetime': 140,
    'select': 100,
    'default': 100,
    'treeSelect': 110,
    'cascade': 110,
    'cascader': 110,
  }

  // 当type为grid时，指定每两个元素的间隔
  rows = {
    gutter: 8
  }

  resetForm(e) {
    this.props.form.resetFields();
    this.searchForm(true);
  }
    
  searchForm(isReset) {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        let errs = [];
        Object.keys(errors).forEach(fieldName => {
          errs = errors[fieldName].errors || [];
        });
        if (errs && errs.length) message.error(errs[0].message);
        return;
      }
      
      this.props.onSearch && this.props.onSearch(values, isReset);
    });
  }

  render () {
    const {className, prefixCls, type, rows, cols, columns, group, children, form, ...otherProps} = this.props;

    const colopts = type === "grid" ? objectAssign(this.cols, cols) : {};
    const rowopts = type === "grid" ? objectAssign(this.rows, rows) : {};

    let ComponentRow = type === "inline" ? PlainComp : Row;
    let ComponentCol = type === "inline" ? PlainComp : Col;
    let ComponentItem = type === "inline" ? PlainComp : Form.Item;
    const formItemLayout = type === "grid" ? {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    } : {};

    let ComponentBtnGroup = type === "inline" ? Button.Group : PlainComp;

    let searchFields = columns.filter(col => col.searchItem);
    searchFields = group ? searchFields.filter(col => col.searchItem && col.searchItem.group === group) : searchFields;

    delete otherProps.onSearch;

    return (
      <div className={cx(prefixCls, className)} {...otherProps}>
        <Form className={cx({"form-inline": type === "inline", "form-grid": type === "grid"})}>
          <ComponentRow className="row-item" {...rowopts}>
            {
              searchFields.map((field, i) => {
                let { placeholder, width, ...otherField } = objectAssign({
                  name: field.name, 
                  title: field.title,
                  placeholder: field.title,
                }, field.searchItem);

                switch (field.searchItem.type) {
                  case 'date~' : 
                  case 'datetime': 
                  case 'date':
                  case 'monthDate' :
                    const dateProps = {
                      form,
                      type: field.searchItem.type,
                      style: type === "inline" ? {width: width || this.width[field.searchItem.type]} : {},
                      format: field.searchItem.format,
                      ...otherField
                    };
                    if (field.searchItem.placeholder) {
                      dateProps.placeholder = field.searchItem.placeholder;
                    }
                    return (
                      <ComponentCol key={`col-${i}`} className="col-item" {...colopts}>
                        <ComponentItem {...formItemLayout} label={field.title} className="col-item-content">
                          <DateForm
                            {...dateProps}
                          />
                        </ComponentItem>
                      </ComponentCol>
                    );
                  case 'cascade':
                  case 'cascader':
                    return (
                      <ComponentCol key={`col-${i}`} className="col-item" {...colopts}>
                        <ComponentItem {...formItemLayout} label={field.title} className="col-item-content">
                          <CascadeForm 
                            form={form}
                            allowClear
                            showSearch
                            style={type === "inline" ? {width: width || this.width.default} : {}}
                            placeholder={placeholder || '请输入查询条件'}
                            {...otherField}
                          />
                        </ComponentItem>
                      </ComponentCol>
                    );
                  case 'select' :
                    return (
                      <ComponentCol key={`col-${i}`} className="col-item" {...colopts}>
                        <ComponentItem {...formItemLayout} label={field.title} className="col-item-content">
                          <SelectForm 
                            form={form}
                            allowClear
                            showSearch
                            dict={field.dict}
                            style={type === "inline" ? {width: width || this.width[field.searchItem.type]} : {}}
                            placeholder={placeholder || '请输入查询条件'}
                            {...otherField}
                          />
                        </ComponentItem>
                      </ComponentCol>
                    );
                  case 'treeSelect' :
                    return (
                      <ComponentCol key={`col-${i}`} className="col-item" {...colopts}>
                        <ComponentItem {...formItemLayout} label={field.title} className="col-item-content">
                          <TreeSelectForm 
                            form={form}
                            allowClear
                            showSearch
                            style={type === "inline" ? {width: width || this.width[field.searchItem.type]} : {}}
                            placeholder={placeholder || '请输入查询条件'}
                            {...otherField}
                          />
                        </ComponentItem>
                      </ComponentCol>
                    );
                  case 'custom' : 
                    return (
                      <ComponentCol key={`col-${i}`} className="col-item" {...colopts}>
                        <ComponentItem {...formItemLayout} label={field.title} className="col-item-content">
                          <CustomForm 
                            form={form}
                            render={field.searchItem.render}
                            style={type === "inline" ? {width: width || this.width[field.searchItem.type]} : {}}
                            placeholder={placeholder || '请输入查询条件'}
                            {...otherField}
                          />
                        </ComponentItem>
                      </ComponentCol>
                    );
                  case 'number' :
                    return (
                      <ComponentCol key={`col-${i}`} className="col-item" {...colopts}>
                        <ComponentItem {...formItemLayout} label={field.title} className="col-item-content">
                          <InputNumberForm
                            form={form}
                            style={type === "inline" ? {width: width || this.width.default} : {}}
                            placeholder={placeholder || '请输入查询条件'}
                            maxLength={field.searchItem.maxLength || "100"}
                            {...otherField}
                          />
                        </ComponentItem>
                      </ComponentCol>
                    ); 
                  default :
                    return (
                      <ComponentCol key={`col-${i}`} className="col-item" {...colopts}>
                        <ComponentItem {...formItemLayout} label={field.title} className="col-item-content">
                          <InputForm
                            form={form}
                            formFieldOptions={{rules: [{pattern: /^[^'_%&<>=?*!]*$/, message: '查询条件中不能包含特殊字符'}]}}
                            style={type === "inline" ? {width: width || this.width.default} : {}}
                            placeholder={placeholder || '请输入查询条件'}
                            maxLength={field.searchItem.maxLength || "100"}
                            {...otherField}
                          />
                        </ComponentItem>
                      </ComponentCol>
                    ); 
                }
              })
            }
            {children}
          </ComponentRow>
          <ComponentBtnGroup className="search-btns">
            <Button 
              title="查询"
              type={type === "grid" ? "primary" : "default"}
              onClick={e => this.searchForm()}  
              htmlType="submit"
              icon="search"
            >查询</Button>
            <Button 
              title="重置"
              onClick={e => this.resetForm()}
              icon="reload"
            >重置</Button>
          </ComponentBtnGroup>
        </Form>
      </div>
    );
  }
}

export default createForm()(SearchBar);