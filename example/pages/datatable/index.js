import React from 'react';
import { DataTable, Button, Icon } from '../../../src';
import Page from '../../component/page';
import dataItems from './data.json';

export default class DataTableDemo extends React.Component {

  render() {
    return (
      <Page className="datatable" title="DataTable" subTitle="数据表格" spacing>
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <section>
            <DataTable columns={columns} dataItems={dataItems} rowKey="roleId" />
          </section>
          <h3>2. 显示行号</h3>
          <section>
            <DataTable columns={columns} dataItems={dataItems} rowKey="roleId" 
              showNum
            />
          </section>
          <h3>3. 表格自带分页</h3>
          <section>
            <DataTable columns={columns} dataItems={dataItems} rowKey="roleId" 
              pagination
            />
          </section>
          <h3>4. 表格单选</h3>
          <section>
            <DataTable columns={columns} dataItems={dataItems} rowKey="roleId" 
              selectType="radio"
            />
          </section>
          <h3>5. 表格多选</h3>
          <section>
            <DataTable columns={columns} dataItems={dataItems} rowKey="roleId" 
              selectType="checkbox"
            />
          </section>
        </nav>
      </Page>
    );
  }
};

const columns = [{
  title: "角色名",
  name: "roleName",
  tableItem: {}
}, {
  title: "角色类型",
  name: "roleType",
  tableItem: {}
}, {
  title: "操作",
  tableItem: {
    width: 120,
    render: (text, record) => (
      <DataTable.Oper>
        <Button tooltip="密码">
          <Icon type="password" />
        </Button>
        <Button tooltip="删除">
          <Icon type="delete" />
        </Button>
      </DataTable.Oper>
    )
  },
}];