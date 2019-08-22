import request from '@/utils/request'

export function getSuperMap(data) {
  return request({
    url: `/superAdmin?limit=${data.limit}&offset=${data.offset}&category=${data.category}`,
    method: 'get'
  })
}

export function getSuperSearch(data) {
  return request({
    url: `/superAdmin/search?query=${data.query}&limit=${data.limit}&offset=${data.offset}`,
    method: 'get'
  })
}

export function postSuperMap(id, data) {
  return request({
    url: `/superAdmin/${id}`,
    method: 'post',
    data
  })
}

export function putSuperMap(id, data) {
  return request({
    url: `/superAdmin/${id}`,
    method: 'put',
    data
  })
}

export function deleteSuperMap(id) {
  return request({
    url: `/superAdmin/${id}`,
    method: 'delete'
  })
}
