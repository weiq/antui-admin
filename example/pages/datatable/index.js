import React from 'react';
import { DataTable, Button, Icon } from '../../../src';
import Page from '../../component/page';
import dataItems from './data.json';

export default class DataTableDemo extends React.Component {

  render() {
    let columns = [{
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
            <Button title="修改">
              <Icon type="edit" />
            </Button>
            <Button title="删除">
              <Icon type="delete" />
            </Button>
          </DataTable.Oper>
        )
      },
    }];

    return (
      <Page className="datatable" title="DataTable" subTitle="数据表格" spacing>
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <section>
            <DataTable columns={columns} dataItems={dataItems} rowKey="roleId" />
          </section>
        </nav>
      </Page>
    );
  }
};