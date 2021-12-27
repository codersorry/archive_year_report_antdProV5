export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/home',
    name: 'home',
    icon: 'HomeOutlined',
    component: '@/pages/Menu/Home',
  },
  {
    path: '/tablecreate',
    name: 'tablecreate',
    icon: 'ToolOutlined',
    component: '@/pages/Menu/BaseTableCreate',
  },
  {
    path: '/tablesend',
    name: 'tablesend',
    icon: 'SendOutlined',
    component: '@/pages/Menu/BaseTableSend',
  },
  {
    path: '/tableview',
    name: 'tableview',
    icon: 'FileSearchOutlined',
    component: '@/pages/Menu/BaseTableView',
  },
  {
    path: '/tablewrite',
    name: 'tablewrite',
    icon: 'FormOutlined',
    component: '@/pages/Menu/BaseTableWrite',
  },
  {
    path: '/system',
    name: 'system',
    icon: 'SettingOutlined',
    // component: '@/pages/Menu/System',
    routes: [
      {
        path: '/system/usermanage',
        name: 'usermanage',
        icon: 'FileSearchOutlined',
        component: '@/pages/Menu/System/OrgManage',
      },
      {
        path: '/system/rolemanage',
        name: 'rolemanage',
        icon: 'FileSearchOutlined',
        component: '@/pages/Menu/System/RoleManage',
      },
      {
        path: '/system/authmanage',
        name: 'authmanage',
        icon: 'FileSearchOutlined',
        component: '@/pages/Menu/System/AuthManage',
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
