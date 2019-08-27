import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale
})

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import waterfall from 'vue-waterfall2'
Vue.use(waterfall)
// Global registration
import NavPage from '@/components/NavPage'
Vue.component('NavPage', NavPage)

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
