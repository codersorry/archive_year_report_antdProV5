import request from '@/utils/request';


//执行登录,获取token
export async function login(params: MYAPI.LoginParamsType) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

//退出登录
export async function logout() {
  return request.post('/auth/logout');
}
