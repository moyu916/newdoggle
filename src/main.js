import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'common/toast/index'
Vue.use(toast)

import 'assets/css/base.css'
import 'assets/css/iconfont.css'

import md5 from 'js-md5'

import {Button, Form, Field, Icon} from 'vant'
Vue.use(Form).use(Button).use(Field).use(Icon)

import { prefix } from 'assets/js/utils'
Vue.prototype.prefix = prefix;

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$md5 = md5

window.vRouter = router

