import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getTable } from '@/services/Menu/baseTableCreate';

import './index.less';

type GithubIssueItem = {
  name: string;
  time: string;
  note: string;
};

const RoleManage = () => {
  //表格ref便于自定义操作表格
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<GithubIssueItem>[] = [
    //全选
    {
      dataIndex: 'index',
      title: '序号',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      // hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="edit_auth"
          style={{
            color: 'rgba(0,0,0,.25)',
            cursor: 'not-allowed',
          }}
        >
          不可操作角色
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable<GithubIssueItem>
        tableClassName="tableStyle"
        options={false}
        rowSelection={{}}
        columns={columns}
        actionRef={actionRef}
        request={async () => getTable()}
        columnsState={{
          persistenceKey: 'role-table',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={false}
        //分页的配置
        pagination={{
          pageSize: 10,
          size: 'default',
          //指定每页可以显示多少条
          pageSizeOptions: ['10', '20', '40', '80'],
        }}
        dateFormatter="string"
      />
    </>
  );
};

export default RoleManage;
