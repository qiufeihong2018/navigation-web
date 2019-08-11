import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: '/auth',
    method: 'get'
  })
}

export function deleteUser(username) {
  return request({
    url: `/auth/user/${username}`,
    method: 'post'
  })
}

export function changepassword(data) {
  return request({
    url: 'auth/changepassword',
    method: 'post',
    data
  })
}

