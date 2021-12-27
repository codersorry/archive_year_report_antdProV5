import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

//获取当前登录用户信息
export async function getUserInfo(): Promise<any> {
  return request('/admin/user');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
