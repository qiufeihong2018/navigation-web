import {
  login,
  logout,
  getInfo,
  register
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import router, {
  resetRouter
} from '@/router'
import {
  Notification
} from 'element-ui'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        commit('SET_TOKEN', response.username)
        setToken(response.username)
        if (response.username) {
          Notification({
            title: '成功',
            message: `${response.username}登录成功`,
            type: 'success'
          })
          resolve()
        } else {
          Notification({
            title: '失败',
            message: `${response.username}登录失败`,
            type: 'error'
          })
          reject(response.err)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  register({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      register({
        username: username.trim(),
        password: password
      }).then(response => {
        if (response.username) {
          Notification({
            title: '成功',
            message: `${response.username}注册成功`,
            type: 'success'
          })
          resolve()
        } else {
          Notification({
            title: '失败',
            message: `${response.username}注册失败`,
            type: 'error'
          })
          reject(response.err)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const {
          username,
          role
        } = response

        if (!username) {
          reject('Verification failed, please Login again.')
        }

        // roles must be a non-empty array
        if (!role || role.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', role)
        commit('SET_NAME', name)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(response => {
        if (response.username) {
          Notification({
            title: '成功',
            message: `${response.username}登出成功`,
            type: 'success'
          })
          resolve()
        } else {
          Notification({
            title: '失败',
            message: `${response.username}登出失败`,
            type: 'error'
          })
          reject(response.err)
        }
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({
    commit,
    dispatch
  }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const {
        roles
      } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, {
        root: true
      })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
