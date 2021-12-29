// import request from '@/utils/request';

// export type addParamsType = {
//   name: string;
//   year: string;
//   note: string;
// };

// //获取Table列表
// export async function getTable(){
//   return request('/tablecreate/gettable')
// }

// //新增Table
// export async function addTable(params: addParamsType) {
//   return request.post('/tablecreate/add', { params });
// }

// //编辑Table
// export async function updateTable(editId: number, params: addParamsType) {
//   return request.put(`/tablecreate/edit/${editId}`, { params });
// }

import myRequest from '@/utils/request';

export type addParamsType = {
  name: string;
  year: string;
  note: string;
};

//获取Table列表
export async function getTable() {
  return myRequest.get({
    url: '/tablecreate/gettable',
    showLoading: true,
  });
}

//新增Table
export async function addTable(params: addParamsType) {
  return myRequest.post({
    url: '/tablecreate/add',
    data: params,
  });
}

//编辑Table
export async function updateTable(editId: number, params: addParamsType) {
  return myRequest.put({
    url: `/tablecreate/edit/${editId}`,
    data: params,
  });
}
