/*
 * @Author: wangtengteng
 * @Date: 2020-11-12 16:48:21
 * @LastEditTime: 2020-11-22 11:31:58
 * @FillPath: Do not edit
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueRouter from 'vue-router';
import routes from './router/index';
import md5 from 'js-md5';
import './assets/css/common.scss';
import '@/config/auth';
import store from './store';

Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
