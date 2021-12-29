// import request from '@/utils/request';

// //获取角色权限信息
// export async function getAuth() {
//   return request('/system/getauth');
// }

import myRequest from '@/utils/request';

//获取角色权限信息
export async function getAuth() {
  return myRequest.request({
    url: '/system/getauth',
    method: 'GET',
  });
}
