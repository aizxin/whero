import Vue from 'vue'
import Element from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization

import Http from './libs/api/http'
import './permission' // permission control
import './icons' // icon

Vue.use(Element, {
  size: 'medium'
})

Vue.use(Http)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
