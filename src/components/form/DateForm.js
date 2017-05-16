import React, {PropTypes} from 'react'
import {DatePicker} from 'antd';
const { MonthPicker, RangePicker } = DatePicker;

export default class DateForm extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    field: PropTypes.object,
    options: PropTypes.object,
    type: PropTypes.string,
  }
  render() {
    const {form, field, type, options, ...otherProps} = this.props;
    const { getFieldDecorator } = form;

    let Component = DatePicker;
    switch (type) {
      case 'date':
        break;
      case 'date~':
        Component = RangePicker;
        break;
      case 'monthDate':
        Component = MonthPicker;
        break;
    }
    return getFieldDecorator(field.name, options)(
      <Component {...otherProps} />
    );
  }
}