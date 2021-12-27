import request from '@/utils/request';

//获取角色权限信息
export async function getAuth() {
  return request('/system/getauth');
}
