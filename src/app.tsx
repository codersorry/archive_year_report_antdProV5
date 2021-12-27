import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
// import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
// import Footer from '@/components/Footer';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
// import { BookOutlined, LinkOutlined } from '@ant-design/icons';

import { getUserInfo } from './services/User/user';

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    //判断本地localStorage是否存在用户信息，存在直接本地获取，不存在再发起请求
    const userInfo = localStorage.getItem('userInfo');
    let response = {};
    if (!userInfo) {
      response = await getUserInfo();
      //将用户信息存到localStorage,注意将对象格式转化为字符串再保存
      localStorage.setItem('userInfo', JSON.stringify(response));
    } else {
      response = JSON.parse(userInfo);
    }
    return response;
    // try {
    //   const msg = await getUserInfo();
    //   console.log(msg);

    //   return msg.data;
    // } catch (error) {
    //   history.push(loginPath);
    // }
    // return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    //自定义头右部的 render 方法
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    //自定义页脚的 render 方法
    // footerRender: () => <Footer />,
    // 页面切换时触发
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    //自定义的菜单头区域  渲染 logo 和 title
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    //右边小齿轮调节样式
    // childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      // return (
        // <>
        //   {children}
        //   {!props.location?.pathname?.includes('/login') && (
        //     <SettingDrawer
        //       enableDarkTheme
        //       settings={initialState?.settings}
        //       onSettingChange={(settings) => {
        //         setInitialState((preInitialState) => ({
        //           ...preInitialState,
        //           settings,
        //         }));
        //       }}
        //     />
        //   )}
        // </>
      // );
    // },
    ...initialState?.settings,
  };
};
