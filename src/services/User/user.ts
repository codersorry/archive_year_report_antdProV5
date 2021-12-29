// import request from '@/utils/request';

// export async function query(): Promise<any> {
//   return request('/api/users');
// }

// //获取当前登录用户信息
// export async function getUserInfo(): Promise<any> {
//   return request('/admin/user');
// }

// export async function queryNotices(): Promise<any> {
//   return request('/api/notices');
// }

import myRequest from '@/utils/request';

export async function query(): Promise<any> {
  return myRequest.get({ url: '/api/users' });
}

//获取当前登录用户信息
export async function getUserInfo(): Promise<any> {
  return myRequest.get({ url: '/admin/user' });
}

export async function queryNotices(): Promise<any> {
  return myRequest.get({ url: '/api/notices' });
}
