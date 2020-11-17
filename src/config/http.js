/*
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:53:29
 * @LastEditTime: 2020-11-17 09:48:46
 * @FillPath: Do not edit
 */
import axios from 'axios'
import { Loading, Message } from "element-ui"

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
let LoadingInstance = {}

service.interceptors.request.use(config => {
  LoadingInstance = Loading.service({ fullscreen: true })
  // const token = getCookie('sid')
  // if (token) {
  //   config.headers.common.Authorization = `${token}`
  // }
  return config
}, error => {
  LoadingInstance.close()
  Message.error({ message: '加载超时' })
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  LoadingInstance.close()
  // if (response.status === 401) {
  //   Message({
  //     type: 'error',
  //     showClose: false,
  //     message: '未授权或授权超时，请重新登录',
  //     duration: 1500,
  //     onClose: () => {
  //       router.push('/Login')
  //     }
  //   })
  //   return
  // }
  return response
}, error => {
  LoadingInstance.close()
  if (error && error.response) {
    error.message = `连接错误${error.response.status}`
  } else {
    error.message = '网络出现问题，请稍后再试'
  }
  Message.error({ message: error.message })

  return Promise.reject(error)
})

export default service