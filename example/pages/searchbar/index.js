import React from 'react';
import { SearchBar } from '../../../src';
import Page from '../../component/page';
import './searchbar.less';

export default class SearchBarDemo extends React.Component {

  render() {
    return (
      <Page className="searchbar-demo" title="SearchBar" subTitle="搜索组件">
        <nav>
          <h2>代码演示</h2>
          <h3>行内搜索</h3>
          <section>
            <SearchBar columns={columns} />
          </section>
          <h3>栅格搜索</h3>
          <section>
            <SearchBar columns={columns} type="grid" />
          </section>
        </nav>
      </Page>
    );
  }
};

let columns = [{
  title: "角色名",
  name: "roleName",
  searchItem: {

  }
}, {
  title: "角色类型",
  name: "roleType",
  searchItem: {
    
  }
}];