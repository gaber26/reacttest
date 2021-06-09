import http from './http'

export let urlPrefix = '/oa'

// let url = "http://localhost:8181"
let url = "http://39.103.176.82:8181"
// export const articleList = (data) => http(`${urlPrefix}/articleList`, data, 'POST') // 查询文章列表

export const articleList = (data) => http(`${url}/book/findAll/${data.current}/${data.size}`, {}, 'GET') // 查询文章列表
export const articleAdd = (data) => http(`${url}/book/save`, data, 'POST') // 新增文章列表
export const articleDetail = (id) => http(`${url}/book/findById/${id}`, {}, 'GET') // 新增文章列表
export const articleUpdate = (data) => http(`${url}/book/update`, data, 'PUT') // 修改文章列表
export const articleDelete = (id) => http(`${url}/book/deleteById/${id}`, {}, 'DELETE') // 删除文章列表