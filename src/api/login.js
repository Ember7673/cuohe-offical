/*
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:55:23
 * @LastEditTime: 2020-11-17 11:22:35
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