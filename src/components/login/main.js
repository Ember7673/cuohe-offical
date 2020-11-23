/*
 * @Author: wangtengteng
 * @Date: 2020-11-21 15:23:55
 * @LastEditTime: 2020-11-23 17:14:10
 * @FillPath: Do not edit
 */
import Vue from 'vue';
import AuthModule from './main.vue';
import { $Cookies } from '@/utils';
import $http from '@/config/http';
import store from '@/store';

const authModuleConstructor = Vue.extend(AuthModule);
let instance;

const initInstance = () => {
  instance = new authModuleConstructor({
    el: document.createElement('div')
  });
  instance.visible = false;
};

const doLogin = (options) => {
  if (!instance) {
    initInstance();
  } else {
    instance.visible = true;
  }
  if (instance.visible) {
    document.body.appendChild(instance.$el);
    instance.visible = true;
    instance.$type = options.$type;
    instance.redirectObject = options.$redirect;
  }
};


const authModule = function (options) {
  doLogin(options);

};

authModule.SignIn = (url) => {
  return authModule({
    $type: 'SignIn',
    $redirect: url
  });
};

authModule.Register = (url) => {
  return authModule({
    $type: 'Register',
    $redirect: url
  });
};

authModule.Wechat = () => {
  return authModule({
    $type: 'Wechat'
  });
};

authModule.close = () => {
  instance.visible = false;
};

authModule.setUserInfo = (userInfo) => {
  store.commit('auth/getUserInfo', userInfo)
}

authModule.removeUserInfo = () => {
  window.localStorage.removeItem('userInfo');
}

export default authModule;
