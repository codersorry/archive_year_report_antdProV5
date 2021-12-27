import React, { useRef, useState } from 'react';
import { MobileOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getTable } from '@/services/Menu/baseTableCreate';
import MobileInput from './components/MobileInput';
import SendModal from './components/SendModal.tsx';

import './index.less';

type GithubIssueItem = {
  name: string;
  time: string;
  note: string;
};

const BaseTableSend = () => {
  //表格ref便于自定义操作表格
  const actionRef = useRef<ActionType>();
  //控制手机填写模态框显示和隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isShowModal = (show: boolean = false) => {
    setIsModalVisible(show);
  };

  //控制分发模态框显示和隐藏
  const [isModalVisibleSend, setisModalVisibleSend] = useState(false);
  const isShowModalSend = (show: boolean = false) => {
    setisModalVisibleSend(show);
  };

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
      title: '年份',
      dataIndex: 'year',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'note',
      hideInSearch: true,
    },

    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a key="send" onClick={() => isShowModalSend(true)}>
          分发
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
          persistenceKey: 'send-table',
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
        headerTitle={
          <Button
            key="mobile"
            icon={<MobileOutlined />}
            type="primary"
            onClick={() => isShowModal(true)}
          >
            手机端填写
          </Button>
        }
      />
      {/* 根据模态框是否显示决定动态加载编辑模态框组件，为了触发子组件生命周期 */}
      {!isShowModal ? (
        ''
      ) : (
        <MobileInput isModalVisible={isModalVisible} isShowModal={isShowModal} />
      )}

      {!isShowModalSend ? (
        ''
      ) : (
        <SendModal isModalVisibleSend={isModalVisibleSend} isShowModalSend={isShowModalSend} />
      )}
    </>
  );
};

export default BaseTableSend;
