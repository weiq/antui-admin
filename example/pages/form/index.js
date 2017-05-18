import React from 'react';
import { Form } from '../../../src';
import Page from '../../component/page';
import moment from 'moment';
import './style.less';

export default class DataTableDemo extends React.Component {
  onSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <Page className="form-demo" title="Form" subTitle="表单">
        <nav>
          <h2>代码演示</h2>
          <h3>最简单的使用</h3>
          <section className="w400">
            <Form columns={columns1} onSubmit={this.onSubmit} />
          </section>
          <h3>行内样式</h3>
          <section className="w500">
            <Form type="inline" columns={columns1} onSubmit={this.onSubmit} />
          </section>
          <h3>赋值</h3>
          <section className="w400">
            <Form columns={columns1} record={record1} onSubmit={this.onSubmit} />
          </section>
          <h3>初始值</h3>
          <section className="w400">
            <Form columns={columns2} onSubmit={this.onSubmit} />
          </section>
          <h3>表单验证</h3>
          <section className="w400">
            <Form columns={columns3} onSubmit={this.onSubmit} />
          </section>
          <h3>用户登录</h3>
          <section className="w400">
            <Form columns={columns4} onSubmit={this.onSubmit} />
          </section>
          <section className="w600">
            <Form type="inline" columns={columns4} onSubmit={this.onSubmit} />
          </section>
          <h3>用户注册</h3>
          <section className="w400">
            <Form columns={columns5} onSubmit={this.onSubmit} />
          </section>
          <h3>日期时间</h3>
          <section className="w400">
            <Form columns={columns6} onSubmit={this.onSubmit} />
          </section>
        </nav>
      </Page>
    );
  }
};

const record1 = {
  id: 123,
  roleType: "2", // 类型不能错，不能是数字的2
  roleName: "管理员"
};

const columns1 = [{
  name: "id",
  formItem: {
    type: "hidden"
  }
}, {
  title: "角色类型",
  name: "roleType",
  dict: [
    {code: "1", codeName: "111"},
    {code: "2", codeName: "222"},
    {code: "3", codeName: "333"},
  ],
  formItem: {
    type: "select"
  }
}, {
  title: "角色名",
  name: "roleName",
  formItem: {}
}];

const columns2 = [{
  name: "id",
  formItem: {
    type: "hidden"
  }
}, {
  title: "角色类型",
  name: "roleType",
  dict: [
    {code: "1", codeName: "111"},
    {code: "2", codeName: "222"},
    {code: "3", codeName: "333"},
  ],
  formItem: {
    type: "select"
  }
}, {
  title: "角色名",
  name: "roleName",
  formItem: {
    initialValue: "小兵"
  }
}];

const columns3 = [{
  name: "id",
  formItem: {
    type: "hidden"
  }
}, {
  title: "角色类型",
  name: "roleType",
  dict: [
    {code: "1", codeName: "111"},
    {code: "2", codeName: "222"},
    {code: "3", codeName: "333"},
  ],
  formItem: {
    type: "select",
    rules: [
      { required: true, message: '请选择一个角色类型！' }
    ]
  }
}, {
  title: "角色名",
  name: "roleName",
  formItem: {
    rules: [{ 
      required: true, 
      message: '请输入角色名'
    }, {
      pattern: /^[\w\u4E00-\u9FA5()]{1,20}$/,
      message: '角色名只能输入1-20个汉字、英文、数字、括号' 
    }]
  }
}];

const columns4 = [ {
  title: "用户名",
  name: "user_name",
  formItem: {
    rules: [{ 
      required: true, 
      message: '请输入用户名'
    }]
  }
}, {
  title: "密码",
  name: "user_password",
  formItem: {
    type: "password"
  }
}];

const columns5 = [ {
  title: "用户名",
  name: "user_name",
  formItem: {
    rules: [{ 
      required: true, 
      message: '请输入用户名'
    }]
  }
}, {
  title: "密码",
  name: "user_password",
  formItem: {
    type: "password",
    repeat: true,
  }
}];

const columns6 = [{
  title: "日期",
  name: "date",
  formItem: {
    type: "date",
  }
}, {
  title: "日期(时间)",
  name: "datetime",
  formItem: {
    type: "datetime",
    showTime: true,
    initialValue: moment()
  }
}, {
  title: "日期范围",
  name: "rangedate",
  formItem: {
    type: "date~"
  }
}, {
  title: "日期范围(时间)",
  name: "rangedate2",
  formItem: {
    type: "date~",
    showTime: true
  }
}, {
  title: "时间",
  name: "time",
  formItem: {
    type: "time"
  }
}];