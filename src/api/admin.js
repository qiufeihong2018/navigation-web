import request from '@/utils/request'

export function getMap() {
  return request({
    url: '/admin',
    method: 'get'
  })
}

export function postMap(data) {
  return request({
    url: '/admin',
    method: 'post',
    data
  })
}

export function putMap(id, data) {
  return request({
    url: `/admin/${id}`,
    method: 'put',
    data
  })
}

export function deleteMap(id) {
  return request({
    url: `/admin/${id}`,
    method: 'delete'
  })
}
