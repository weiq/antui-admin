import React from 'react';
import { SearchBar } from '../../../src';
import Page from '../../component/page';
import {Input, Icon} from 'antd';
import './searchbar.less';

export default class SearchBarDemo extends React.Component {
  onSearch(values, isReset) {
    console.log(values, isReset);
  }

  render() {
    return (
      <Page className="searchbar-demo" title="SearchBar" subTitle="搜索组件">
        <nav>
          <h2>代码演示</h2>
          <h3>行内搜索</h3>
          <section>
            <SearchBar columns={columns1} onSearch={this.onSearch} />
          </section>
          <h3>日期时间</h3>
          <section>
            <SearchBar columns={columns3} onSearch={this.onSearch} />
          </section>
          <h3>级联, 下接树</h3>
          <section>
            <SearchBar columns={columns5} onSearch={this.onSearch} />
          </section>
          <h3>栅格搜索</h3>
          <section>
            <SearchBar columns={columns2} type="grid" onSearch={this.onSearch} />
          </section>
          <section>
            <SearchBar columns={columns3} type="grid" onSearch={this.onSearch} />
          </section>
          <h3>多个条件</h3>
          <section>
            <SearchBar columns={columns4} type="grid" onSearch={this.onSearch} />
          </section>
          <h3>级联, 下接树</h3>
          <section>
            <SearchBar columns={columns5} type="grid" onSearch={this.onSearch} />
          </section>
          <h3>自定义渲染</h3>
          <section>
            <SearchBar columns={columns6} type="grid" onSearch={this.onSearch} />
          </section>
        </nav>
      </Page>
    );
  }
};

const columns1 = [{
  title: "角色类型",
  name: "roleType",
  dict: [
    {code: "1", codeName: "111"},
    {code: "2", codeName: "222"},
    {code: "3", codeName: "333"},
  ],
  searchItem: {
    type: "select"
  }
}, {
  title: "角色名",
  name: "roleName",
  searchItem: {}
}];

const columns2 = [{
  title: "角色名",
  name: "roleName",
  searchItem: {}
}, {
  title: "角色类型",
  name: "roleType",
  dict: [
    {code: "1", codeName: "111"},
    {code: "2", codeName: "222"},
    {code: "3", codeName: "333"},
  ],
  searchItem: {
    type: "select"
  }
}];

const columns3 = [{
  title: "选择时间",
  name: "date1",
  searchItem: {
    type: "date"
  }
}, {
  title: "选择时间",
  name: "date2",
  searchItem: {
    type: "date~",
    placeholder: ['这是开始时间', '这是结束时间']
  }
}, {
  title: "选择时间",
  name: "date3",
  searchItem: {
    type: "monthDate"
  }
}];

const columns4 = [{
  title: "条件1",
  name: "key1",
  searchItem: {}
}, {
  title: "条件2",
  name: "key2",
  searchItem: {}
}, {
  title: "条件3",
  name: "key3",
  searchItem: {}
}, {
  title: "条件4",
  name: "key4",
  searchItem: {}
}, {
  title: "条件5",
  name: "key5",
  searchItem: {}
}, {
  title: "条件6",
  name: "key6",
  searchItem: {}
}, {
  title: "条件7",
  name: "key7",
  searchItem: {}
}, {
  title: "条件8",
  name: "key8",
  searchItem: {}
}, {
  title: "条件9",
  name: "key9",
  searchItem: {}
}];

const columns5 = [{
  title: "address",
  name: "key1",
  searchItem: {
    type: "cascade",
    options: [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
      }],
    }]
  }
}, {
  title: "address1",
  name: "key2",
  searchItem: {
    type: "treeSelect",
    treeData: [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
      }],
    }]
  }
}];

const columns6 = [{
  title: "自定义渲染",
  name: "key",
  searchItem: {
    type: "custom",
    render: (record, form) => {
      // ...
      const {getFieldDecorator} = form;
      return getFieldDecorator('userName', {
        rules: [{ required: true, message: '请输入用户名!' }],
      })(
        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
      );
    }
  }
}];
