import request from '@/utils/request'

export function getSuperMap() {
  return request({
    url: '/superAdmin',
    method: 'get'
  })
}

export function getSuperSearch(query) {
  return request({
    url: `/superAdmin/search/${query}`,
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
