/*
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:53:29
 * @LastEditTime: 2020-12-03 18:56:04
 * @FillPath: Do not edit
 */
import axios from 'axios'
import { Message } from "element-ui"
import Vue from 'vue';
const vm = Vue.prototype;

const config = {
  baseURL: '/official/api/',
  timeout: 5000,
  withCredentials: false,
  responseType: 'json',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  xsrfCookieName: 'XSRF-TOKEN',
  maxContentLength: 2000
}


const service = axios.create(config)

service.interceptors.request.use(config => {
  return config
}, error => {
  Message.error({ message: '加载超时' })
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const status = response.data.status;
  if (status === 100) {
    vm.$auth.removeUserInfo();
    vm.$SignIn();
  }
  return response
}, error => {
  // LoadingInstance.close()
  if (error && error.response) {
    error.message = `连接错误${error.response.status}`
  } else {
    error.message = '网络出现问题，请稍后再试'
  }
  Message.error({ message: error.message })

  return Promise.reject(error)
})

export default service