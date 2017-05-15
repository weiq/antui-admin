import React from 'react';
import { SearchBar } from '../../../src';
import Page from '../../component/page';
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
          <section>
            <SearchBar columns={columns2} onSearch={this.onSearch} />
          </section>
          <h3>栅格搜索</h3>
          <section>
            <SearchBar columns={columns2} type="grid" onSearch={this.onSearch} />
          </section>
        </nav>
      </Page>
    );
  }
};

let columns1 = [{
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

let columns2 = [{
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