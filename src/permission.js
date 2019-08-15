/* eslint-disable spaced-comment */
import router from './router'
import store from './store'
import Message from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import {
  accessRoutes
} from '@/router/index.js'
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      next()

      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const {
            role
          } = await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          // const accessRoutes = await store.dispatch('permission/generateRoutes', role)
          if (role === 'superAdmin') {
            // // dynamically add accessible routes
            // router.addRoutes(accessRoutes)

            // 动态添加导航栏时，addRoutes不生效解决
            // 在addroutes前，使用router.options.routes=XXXXX的方法手动添加
            // for (const i in accessRoutes) {
            //   router.options.routes.push(accessRoutes[i])
            // }
          }


          console.log(router.options.routes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          //hack方法确保addroutes完成
          //设置replace:true，导航不会留下历史记录
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
