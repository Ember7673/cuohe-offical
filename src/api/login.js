/*
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:55:23
 * @LastEditTime: 2020-11-23 23:27:25
 * @FillPath: Do not edit
 */
import $http from '@/config/http';
import querystring from 'querystring';
import { Message } from 'element-ui';
import axios from 'axios';

export const login = (params) => {
  let requestUrl = '/get-user';
  return $http.post(requestUrl, params)
}

export const sendSMSCode = (params) => {
  let requestUrl = '/mb/sendcode';
  return $http.post(requestUrl, params)
}
// 账号密码登录
export const accountLogin = (params) => {
  let requestUrl = '/login-with-password';
  return $http.post(requestUrl, params)
}
// 验证码登录
export const smsLogin = (params) => {
  let requestUrl = '/login-with-valid_num';
  return $http.post(requestUrl, params)
}

// 是否登录
export const getIsLogin = (params) => {
  let requestUrl = '/get-session-info';
  return $http.post(requestUrl, params)
}

// 登出
export const logout = (params) => {
  let requestUrl = '/logout';
  return $http.post(requestUrl, params)
}

// 注册
export const createUser = (params) => {
  let requestUrl = '/create-user';
  return $http.post(requestUrl, params)
}

// 用户身份验证
export const verifyUserIdentity = (params) => {
  let requestUrl = '/verify-user-identity';
  return $http.post(requestUrl, params)
}