import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
// import { login } from '@/services/ant-design-pro/api';
import { login } from '@/services/User/login';

import styles from './index.less';

// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => (
//   <Alert
//     style={{
//       marginBottom: 24,
//     }}
//     message={content}
//     type="error"
//     showIcon
//   />
// );

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log(userInfo);

    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: MYAPI.LoginParamsType) => {
    try {
      // 登录
      const msg = await login({ ...values });
      if (msg.status === 'ok') {
        //保存token到本地localStorage
        localStorage.setItem('access_token', msg.access_token);

        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);

        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      } else {
        message.error('登陆失败！');
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      //登录失败，设置用户信息失败后，清除本地token和userInfo
      localStorage.removeItem('access_token');
      localStorage.removeItem('userInfo');
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  //   try {
  //     // 登录
  //     const msg = await login({ ...values });
  //     if (msg.status === 'ok') {
  //       const defaultLoginSuccessMessage = intl.formatMessage({
  //         id: 'pages.login.success',
  //         defaultMessage: '登录成功！',
  //       });
  //       message.success(defaultLoginSuccessMessage);
  //       await fetchUserInfo();
  //       /** 此方法会跳转到 redirect 参数所在的位置 */
  //       if (!history) return;
  //       const { query } = history.location;
  //       const { redirect } = query as { redirect: string };
  //       history.push(redirect || '/');
  //       return;
  //     }
  //     console.log(msg);
  //     // 如果失败去设置用户错误信息
  //     setUserLoginState(msg);
  //   } catch (error) {
  //     const defaultLoginFailureMessage = intl.formatMessage({
  //       id: 'pages.login.failure',
  //       defaultMessage: '登录失败，请重试！',
  //     });
  //     message.error(defaultLoginFailureMessage);
  //   }
  // };
  const { status } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        <h1 style={{ color: '#fff' }}>鸿翼档案年报系统</h1>
        {/* {SelectLang && <SelectLang />} */}
      </div>
      <div className={styles.loginDiv}>
        <div className={styles.content}>
          <LoginForm
            // logo={<img alt="logo" src="/logo.svg" />}
            title="鸿翼档案年报系统"
            // subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as MYAPI.LoginParamsType);
            }}
          >
            <Tabs activeKey="account">
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                })}
              />
            </Tabs>

            {/* {status === 'error' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: '账户或密码错误(admin/qwer)',
                })}
              />
            )} */}
            {
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  // placeholder={intl.formatMessage({
                  //   id: 'pages.login.username.placeholder',
                  //   defaultMessage: '用户名: admin or user',
                  // })}
                  placeholder="用户名：admin or user"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  // placeholder={intl.formatMessage({
                  //   id: 'pages.login.password.placeholder',
                  //   defaultMessage: '密码: qwer',
                  // })}
                  placeholder="密码：edoc2"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            }

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </a>
            </div>
          </LoginForm>
        </div>
        <div className={styles.footerDiv}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Login;
