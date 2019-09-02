import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// set ElementUI lang to EN
Vue.use(ElementUI, {
  zhLocale
})
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

import App from './App'
import store from './store'
import router from './router'

// // Global registration
// import NavPage from '@/components/NavPage'
// Vue.component('NavPage', NavPage)

import '@/icons' // icon
import { permission } from '@/permission'

if (process.env.NODE_ENV === 'production') {
  permission()
}

Vue.config.productionTip = false

Vue.filter('timeTrans', function(value) {
  if (value === '') {
    // eslint-disable-next-line
    return new Date().toLocaleString('chinese', {
      hour12: false
    })
  }
  // eslint-disable-next-line
  return new Date(value).toLocaleString('chinese', {
    hour12: false
  })
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
