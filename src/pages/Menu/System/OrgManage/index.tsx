import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getTable } from '@/services/Menu/baseTableCreate';
import CreateOrEdit from './components/CreateOrEdit';

import styles from './index.less';

type GithubIssueItem = {
  name: string;
  time: string;
  note: string;
};

const OrgManage = () => {
  //表格ref便于自定义操作表格
  const actionRef = useRef<ActionType>();
  //编辑id
  const [record, setRecord] = useState(undefined);
  //控制模态框显示和隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isShowModal = (show: boolean = false, getRecord = undefined) => {
    setIsModalVisible(show);
    setRecord(getRecord);
  };

  //确认删除
  function confirm() {
    Modal.confirm({
      centered: true,
      title: '删除确认',
      icon: <ExclamationCircleOutlined />,
      content: '请确认是否删除，删除后将无法恢复，请谨慎操作！',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns: ProColumns<GithubIssueItem>[] = [
    //全选
    {
      dataIndex: 'index',
      title: '序号',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '单位名称',
      dataIndex: 'departmentName',
    },
    {
      title: '角色',
      dataIndex: 'role',
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
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log(record);
            isShowModal(true, record);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          style={{ color: 'red' }}
          onClick={() => {
            confirm();
          }}
        >
          删除
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
        columnsState={{
          persistenceKey: 'org-table',
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
        headerTitle={
          <Button
            onClick={() => isShowModal(true)}
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            新增
          </Button>
        }
      />
      {/* 根据模态框是否显示决定动态加载编辑模态框组件，为了触发子组件生命周期 */}
      {!isShowModal ? (
        ''
      ) : (
        <CreateOrEdit
          actionRef={actionRef}
          isModalVisible={isModalVisible}
          isShowModal={isShowModal}
          record={record}
        />
      )}
    </>
  );
};

export default OrgManage;
