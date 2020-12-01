/*
 * @Author: wangtengteng
 * @Date: 2020-12-01 18:33:11
 * @LastEditTime: 2020-12-01 18:38:31
 * @FillPath: Do not edit
 */
import $http from '@/config/http';
// 需求列表
export const getRequirementListMoudle = (params) => {
  let requestUrl = '/requirement-list';
  return $http.post(requestUrl, params)
}
// 需求列表
export const getResourceListMoudle = (params) => {
  let requestUrl = '/resource-list';
  return $http.post(requestUrl, params)
}