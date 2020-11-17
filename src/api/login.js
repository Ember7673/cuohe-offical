/*
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:55:23
 * @LastEditTime: 2020-11-17 10:22:55
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

export const accountLogin = (params) => {
  let requestUrl = '/login-with-password';
  return $http.post(requestUrl, params)
}