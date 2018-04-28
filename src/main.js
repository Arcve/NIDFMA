// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './bootstrap'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import { registerConstantValue } from './di'
import {STORE_ID, createStore} from './store'
import {ROUTER_ID, createRouter} from './router'
import './services/api'

Vue.use(ElementUI)
Vue.config.productionTip = false

let store = createStore()
registerConstantValue(STORE_ID, store)

let router = createRouter()
registerConstantValue(ROUTER_ID, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
