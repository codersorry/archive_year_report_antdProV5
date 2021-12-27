import React, { useEffect } from 'react';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Modal, Row, Space, message, Button } from 'antd';

import { addTable } from '@/services/Menu/baseTableCreate';
import { updateTable } from '@/services/Menu/baseTableCreate';

const CreateOrEdit = (props) => {
  //props获取的数据： 控制模态框开启的值/是否打开模态框函数/操作表格的引用/record
  const { isModalVisible, isShowModal, actionRef, record } = props;
  const type = record ? '编辑' : '新增';
  //提交触发的事件
  const handleSubmit = async (values) => {
    let response;
    if (record) {
      //发送编辑请求
      response = await updateTable(record.id, values);
    } else {
      //发送新增请求
      response = await addTable(values);
    }
    if (response.status === 200) {
      message.success(`${type}成功`);
      //刷新表格数据
      actionRef.current?.reload();
      //关闭弹窗
      isShowModal(false);
    } else {
      message.error(`${type}失败`);
      isShowModal(false);
    }
  };

  return (
    <Modal
      centered={true}
      destroyOnClose={true}
      footer={null}
      title={`${type}`}
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
    >
      <ProForm
        initialValues={record}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        // {...formItemLayout}
        layout="horizontal"
        submitter={{
          render: (props, doms) => {
            return (
              <Row>
                <Space className="subBtn">
                  <Button key="yes" type="primary" htmlType="submit">
                    确认
                  </Button>
                  ,
                  <Button key="cancel" onClick={() => isShowModal(false)}>
                    取消
                  </Button>
                  ,
                </Space>
              </Row>
            );
          },
        }}
        onFinish={async (values) => handleSubmit(values)}
      >
        <h3>基本信息</h3>
        <ProFormText
          width="md"
          name="departmentName"
          label="单位名称"
          placeholder="请输入单位名称"
          rules={[{ required: true, message: '请输入单位名称' }]}
        />
        <ProFormSelect
          width="md"
          options={[
            {
              value: '立档单位',
              label: '立档单位',
            },
            {
              value: '下属单位',
              label: '下属单位',
            },
          ]}
          name="department"
          label="角色类型"
          rules={[{ required: true, message: '请选择角色类型' }]}
        />
        <h3>账号设置</h3>
        <ProFormText
          width="md"
          name="username"
          label="账号"
          placeholder="请输入账号"
          rules={[{ required: true, message: '请输入账号' }]}
        />
        <ProFormText.Password
          width="md"
          name="password"
          label="密码"
          placeholder="请输入密码"
          rules={[{ required: true, message: '请输入密码' }]}
        />
      </ProForm>
    </Modal>
  );
};

export default CreateOrEdit;
