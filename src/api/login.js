/*
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:55:23
 * @LastEditTime: 2020-12-03 19:33:23
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

// 行业类型
export const getIndustryListMoudle = (params) => {
  let requestUrl = '/industry-list';
  return $http.post(requestUrl, params)
}
// 职位列表
export const getPositionListMoudle = (params) => {
  let requestUrl = '/position-list';
  return $http.post(requestUrl, params)
}
// 判断昵称是否存在
export const checkNnickNameExistMoudle = (params) => {
  let requestUrl = '/check-nick-name-exist';
  return $http.post(requestUrl, params)
}

// 获取头像资源列表
export const getAvatarListMoudle = (params) => {
  let requestUrl = '/get-avatar-list';
  return $http.post(requestUrl, params)
}

// 设置账号信息
export const setUserInfoMoudle = (params) => {
  let requestUrl = '/set-user-info';
  return $http.post(requestUrl, params)
}

// 校验验证码（重置密码用）
export const checkValidCodeMoudle = (params) => {
  let requestUrl = '/check-valid-code';
  return $http.post(requestUrl, params)
}
// 重置密码
export const resetPasswordMoudle = (params) => {
  let requestUrl = '/reset-password';
  return $http.post(requestUrl, params)
}

// 更新个人信息
export const updateUserInfoMoudle = (params) => {
  let requestUrl = '/update-user-info';
  return $http.post(requestUrl, params)
}

// 客服电话
export const customerServicePhoneNumMoudle = (params) => {
  let requestUrl = '/customer-service-phone-num';
  return $http.post(requestUrl, params)
}