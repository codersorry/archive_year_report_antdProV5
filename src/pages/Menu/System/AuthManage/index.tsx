import React, { useRef, useState, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAuth } from '@/services/Menu/System/authManage';
import { Checkbox } from 'antd';

import styles from './index.less';

type authType = {
  home: boolean;
  create: boolean;
  send: boolean;
  write: boolean;
  view: boolean;
  org: boolean;
  role: boolean;
  auth: boolean;
};

type GithubIssueItem = {
  roleName: string;
  auth: authType;
};

const AuthManage = () => {
  //table里面的数据
  const [tableData, setTableData] = useState({});
  //发送请求数据
  useEffect(() => {
    async function getData() {
      const data = await getAuth();
      setTableData(data);
    }
    getData();
  }, []);

  useEffect(() => {
    //查看tableData的最新值
    console.log('useEffect', tableData);
  }, [tableData]);

  //表格ref便于自定义操作表格
  const actionRef = useRef<ActionType>();
  //控制点击编辑后的display,以及每一列的disabled
  const [isShow1, setIsShow1] = useState(true);
  const [isShow2, setIsShow2] = useState(true);
  const [isShow3, setIsShow3] = useState(true);

  //封装的控制display和disabled的2个函数
  const isShowControl = (roleName: string) => {
    if (roleName === 'Role1') {
      return isShow1;
    } else if (roleName === 'Role2') {
      return isShow2;
    } else {
      return isShow3;
    }
  };
  const setIsShowControl = (roleName: string, isShow: boolean) => {
    if (roleName === 'Role1') {
      setIsShow1(isShow);
    } else if (roleName === 'Role2') {
      setIsShow2(isShow);
    } else {
      setIsShow3(isShow);
    }
  };

  //封装修改checkbox后同步修改tableData的函数
  const updateTableData = (roleName, checked, authName) => {
    let newData = [];
    if (roleName === 'Role1') {
      newData = tableData.data.map((item) => {
        if (item.roleName === 'Role1') {
          switch (authName) {
            case 'home':
              return { ...item, auth: { ...item.auth, home: checked } };
              break;
            case 'create':
              return { ...item, auth: { ...item.auth, create: checked } };
              break;
            case 'send':
              return { ...item, auth: { ...item.auth, send: checked } };
              break;
            case 'view':
              return { ...item, auth: { ...item.auth, view: checked } };
              break;
            case 'write':
              return { ...item, auth: { ...item.auth, write: checked } };
              break;
            case 'org':
              return { ...item, auth: { ...item.auth, org: checked } };
              break;
            case 'role':
              return { ...item, auth: { ...item.auth, role: checked } };
              break;
            case 'auth':
              return { ...item, auth: { ...item.auth, auth: checked } };
              break;
          }
        } else {
          return item;
        }
      });
      setTableData({ ...tableData, data: newData });
    } else if (roleName === 'Role2') {
      newData = tableData.data.map((item) => {
        if (item.roleName === 'Role2') {
          switch (authName) {
            case 'home':
              return { ...item, auth: { ...item.auth, home: checked } };
              break;
            case 'create':
              return { ...item, auth: { ...item.auth, create: checked } };
              break;
            case 'send':
              return { ...item, auth: { ...item.auth, send: checked } };
              break;
            case 'view':
              return { ...item, auth: { ...item.auth, view: checked } };
              break;
            case 'write':
              return { ...item, auth: { ...item.auth, write: checked } };
              break;
            case 'org':
              return { ...item, auth: { ...item.auth, org: checked } };
              break;
            case 'role':
              return { ...item, auth: { ...item.auth, role: checked } };
              break;
            case 'auth':
              return { ...item, auth: { ...item.auth, auth: checked } };
              break;
          }
        } else {
          return item;
        }
      });
      setTableData({ ...tableData, data: newData });
    } else {
      newData = tableData.data.map((item) => {
        if (item.roleName === 'Role3') {
          switch (authName) {
            case 'home':
              return { ...item, auth: { ...item.auth, home: checked } };
              break;
            case 'create':
              return { ...item, auth: { ...item.auth, create: checked } };
              break;
            case 'send':
              return { ...item, auth: { ...item.auth, send: checked } };
              break;
            case 'view':
              return { ...item, auth: { ...item.auth, view: checked } };
              break;
            case 'write':
              return { ...item, auth: { ...item.auth, write: checked } };
              break;
            case 'org':
              return { ...item, auth: { ...item.auth, org: checked } };
              break;
            case 'role':
              return { ...item, auth: { ...item.auth, role: checked } };
              break;
            case 'auth':
              return { ...item, auth: { ...item.auth, auth: checked } };
              break;
          }
        } else {
          return item;
        }
      });
      setTableData({ ...tableData, data: newData });
    }
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    //全选
    {
      dataIndex: 'index',
      title: '序号',
      valueType: 'indexBorder',
      width: 80,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      // hideInSearch: true,
      width: 200,
      editable: false,
    },
    {
      title: '功能',
      dataIndex: 'auth',
      initialValue: ['all'],
      hideInSearch: true,
      render: (text, record, index) => {
        const isShow = isShowControl(record.roleName);
        return [
          <Checkbox
            // onClick={(e) => {
            //   const data2 = tableData;
            //   const flag = data2.data[0].auth.home;
            //   data2.data[0].auth.home = !flag;
            //   setTableData(data2);
            //   console.log(tableData);
            //   console.log(e);
            // }}
            onChange={(e) => {
              // let newData = [];
              // if (record.roleName === 'Role1') {
              //   newData = tableData.data.map((item) => {
              //     if (item.roleName === 'Role1') {
              //       console.log(e.target.checked);
              //       return { ...item, auth: { ...item.auth, home: e.target.checked } };
              //     } else {
              //       return item;
              //     }
              //   });
              //   setTableData({ ...tableData, data: newData });
              // } else if (record.roleName === 'Role2') {
              //   newData = tableData.data.map((item) => {
              //     if (item.roleName === 'Role2') {
              //       console.log(e.target.checked);
              //       return { ...item, auth: { ...item.auth, home: e.target.checked } };
              //     } else {
              //       return item;
              //     }
              //   });
              //   setTableData({ ...tableData, data: newData });
              // } else {
              //   newData = tableData.data.map((item) => {
              //     if (item.roleName === 'Role3') {
              //       console.log(e.target.checked);
              //       return { ...item, auth: { ...item.auth, home: e.target.checked } };
              //     } else {
              //       return item;
              //     }
              //   });
              //   setTableData({ ...tableData, data: newData });
              // }
              updateTableData(record.roleName, e.target.checked, 'home');
            }}
            disabled={isShow}
            key="home"
            defaultChecked={record.auth.home}
          >
            首页
          </Checkbox>,
          <Checkbox
            onChange={(e) => {
              updateTableData(record.roleName, e.target.checked, 'create');
            }}
            disabled={isShow}
            key="create"
            checked={record.auth.create}
          >
            基本信息表制作
          </Checkbox>,
          <Checkbox
            onChange={(e) => {
              updateTableData(record.roleName, e.target.checked, 'send');
            }}
            disabled={isShow}
            key="send"
            checked={record.auth.send}
          >
            基本信息表分发
          </Checkbox>,
          <Checkbox
            onChange={(e) => {
              updateTableData(record.roleName, e.target.checked, 'write');
            }}
            disabled={isShow}
            key="write"
            checked={record.auth.write}
          >
            基本信息表填报
          </Checkbox>,
          <Checkbox
            onChange={(e) => {
              updateTableData(record.roleName, e.target.checked, 'view');
            }}
            disabled={isShow}
            key="view"
            checked={record.auth.view}
          >
            基本信息表查看
          </Checkbox>,
          <Checkbox
            onChange={(e) => {
              updateTableData(record.roleName, e.target.checked, 'org');
            }}
            disabled={isShow}
            key="org"
            checked={record.auth.org}
          >
            组织管理
          </Checkbox>,
          <Checkbox
            onChange={(e) => {
              updateTableData(record.roleName, e.target.checked, 'role');
            }}
            disabled={isShow}
            key="role"
            checked={record.auth.role}
          >
            角色管理
          </Checkbox>,
          <Checkbox
            onChange={(e) => {
              updateTableData(record.roleName, e.target.checked, 'auth');
            }}
            disabled={isShow}
            key="auth"
            checked={record.auth.auth}
          >
            权限管理
          </Checkbox>,
        ];
      },
    },
    {
      title: '操作',
      width: 300,
      valueType: 'option',
      render: (text, record, _, action) => {
        const isShow = isShowControl(record.roleName);
        return [
          <a
            key="edit_auth"
            style={{
              display: `${isShow ? 'block' : 'none'}`,
              // height: 32,
              padding: 5,
            }}
            onClick={() => {
              setIsShowControl(record.roleName, false);
            }}
          >
            编辑
          </a>,
          <a
            key="save"
            style={{
              display: `${isShow ? 'none' : 'block'}`,
              padding: 5,
            }}
            onClick={() => {
              setIsShowControl(record.roleName, true);
              console.log(record);
            }}
          >
            保存
          </a>,
          <a
            key="cancal"
            style={{
              display: `${isShow ? 'none' : 'block'}`,
              padding: 5,
            }}
            onClick={() => {
              setIsShowControl(record.roleName, true);
            }}
          >
            取消
          </a>,
        ];
      },
    },
  ];

  return (
    <>
      <ProTable<GithubIssueItem>
        dataSource={tableData.data}
        tableClassName={styles.tableStyle}
        options={false}
        rowSelection={{}}
        columns={columns}
        actionRef={actionRef}
        // request={async () => getAuth()}
        columnsState={{
          persistenceKey: 'role-table',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        // search={false}
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

export default AuthManage;
