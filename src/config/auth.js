/*
 * @Author: wangtengteng
 * @Date: 2020-11-21 15:26:49
 * @LastEditTime: 2020-11-21 15:27:04
 * @FillPath: Do not edit
 */
import Vue from 'vue';
import AuthModule from '@/components/login';

Vue.use(AuthModule);
Vue.prototype.$auth = AuthModule;
Vue.prototype.$SignIn = AuthModule.SignIn;
Vue.prototype.$Register = AuthModule.Register;
