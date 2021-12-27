import React from 'react';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Modal, Row, Space, message, Button } from 'antd';

// import { addTable } from '@/services/baseTableCreate';
//import .....获取用户密码校验接口

const ChangePassword = (props) => {
  const { isModalVisible, isShowModal, actionRef } = props;
  //发送请求，修改密码
  const changePsd = async (values) => {
    console.log(values);
    const response = await addTable(values);
    if (response.status === 200) {
      message.success('修改成功');
      //刷新表格数据
      actionRef.current?.reload();
      //关闭弹窗
      isShowModal(false);
    } else {
      message.error('修改失败');
      isShowModal(false);
    }
  };

  //获取原来密码
  const getPassword = () => {
    //调用接口获取原密码
    return 'qwer';
  };
  return (
    <Modal
      destroyOnClose={true}
      footer={null}
      title="新增"
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
    >
      <ProForm
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        // {...formItemLayout}
        layout="horizontal"
        submitter={{
          render: (props, doms) => {
            return (
              <Row>
                <Space className="subBtn">
                  {[
                    <Button type="primary" htmlType="submit">
                      确认
                    </Button>,
                    <Button onClick={() => isShowModal(false)}>取消</Button>,
                  ]}
                </Space>
              </Row>
            );
          },
        }}
        onFinish={async (values) => changePsd(values)}
      >
        <ProFormText.Password
          width="md"
          name="old_password"
          label="原密码"
          placeholder="请输入原密码"
          hasFeedback
          rules={[
            { required: true, message: '请输入名称' },
            ({}) => ({
              validator(_, value) {
                if (!value || getPassword() === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('原密码错误!'));
              },
            }),
          ]}
        />
        <ProFormText.Password
          width="md"
          name="new_password"
          label="新密码"
          placeholder="请输入新密码"
          hasFeedback
          rules={[{ required: true, message: '请输入新密码' }]}
        />
        <ProFormText.Password
          width="md"
          name="re_new_password"
          label="确认密码"
          placeholder="请再次输入新密码"
          hasFeedback
          dependencies={['new_password']}
          rules={[
            { required: true, message: '请再次输入新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码不一致!'));
              },
            }),
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default ChangePassword;
