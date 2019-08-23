import request from '@/utils/request'

export function getMap(data) {
  return request({
    url: `/admin?limit=${data.limit}&offset=${data.offset}&tag=${data.tag}`,
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
