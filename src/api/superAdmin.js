import request from '@/utils/request'

export function getMap() {
  return request({
    url: '/superAdmin',
    method: 'get'
  })
}

export function postMap(id, data) {
  return request({
    url: `/superAdmin/${id}`,
    method: 'post',
    data
  })
}

export function putMap(id, data) {
  return request({
    url: `/superAdmin/${id}`,
    method: 'put',
    data
  })
}

export function deleteMap(id) {
  return request({
    url: `/superAdmin/${id}`,
    method: 'delete'
  })
}
