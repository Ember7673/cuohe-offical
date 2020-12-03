/*
 * @Author: wangtengteng
 * @Date: 2020-12-01 18:33:11
 * @LastEditTime: 2020-12-03 11:19:03
 * @FillPath: Do not edit
 */
import $http from '@/config/http';
import querystring from 'querystring';

// 需求列表
export const getRequirementListMoudle = (params) => {
  let requestUrl = '/requirement-list';
  return $http.post(requestUrl, params)
}
// 资源列表
export const getResourceListMoudle = (params) => {
  let requestUrl = '/resource-list';
  return $http.post(requestUrl, params)
}

export const getCosToken = (params) => {
  let requestUrl = '/get-cos-token';
  let queries = querystring.stringify(params);
  requestUrl += '?' + queries
  return $http.get(requestUrl)
}

// 创建需求
export const createRequirementMoudle = (params) => {
  let requestUrl = '/create-requirement';
  return $http.post(requestUrl, params)
}

// 创建资源
export const createResourceMoudle = (params) => {
  let requestUrl = '/create-resource';
  return $http.post(requestUrl, params)
}

//邀请码列表
export const inviteCodeMoudle = (params) => {
  let requestUrl = '/invite-code-list';
  return $http.post(requestUrl, params)
}

// 创建邀请码
export const createInviteCodeMoudle = (params) => {
  let requestUrl = '/create-invite-code';
  return $http.post(requestUrl, params)
}