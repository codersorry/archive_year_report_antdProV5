import React, { useRef, useState } from 'react';
import { MobileOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getTable } from '@/services/Menu/baseTableCreate';

import styles from './index.less'

type GithubIssueItem = {
  name: string;
  time: string;
  note: string;
};

const BaseTableWrite = () => {
  //表格ref便于自定义操作表格
  const actionRef = useRef<ActionType>();
  //控制模态框显示和隐藏
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const isShowModal = (show: boolean = false) => {
  //   setIsModalVisible(show);
  // };

  const columns: ProColumns<GithubIssueItem>[] = [
    //全选
    {
      dataIndex: 'index',
      title: '序号',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '分发时间',
      dataIndex: 'sendTime',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '最后提交时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      // sorter: true,
      hideInSearch: true,
    },
    {
      title: '分发单位',
      dataIndex: 'department',
      hideInSearch: true,
    },
    {
      title: '提交状态',
      dataIndex: 'subStatus',
      hideInSearch: true,
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      hideInSearch: true,
    },
    {
      title: '说明',
      dataIndex: 'explain',
      hideInSearch: true,
    },

    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a key="send" onClick={() => {}}>
          填报
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable<GithubIssueItem>
        tableClassName={styles.tableStyle}
        options={false}
        rowSelection={{}}
        columns={columns}
        actionRef={actionRef}
        request={async () => getTable()}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'view-table',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
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

export default BaseTableWrite;
