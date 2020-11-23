/*
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:28:16
 * @LastEditTime: 2020-11-24 00:22:09
 * @FillPath: Do not edit
 */

import Index from '@/views/Index/index';
import MyCenter from '@/views/MyCenter/index';
import IdVerify from '@/views/Userinfo/IdVerify';
import Choose from '@/views/Userinfo/choose';
import PersonInfo from '@/views/Userinfo/personalInfo';

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/mycenter',
    component: MyCenter
  },
  {
    path: '/idverify',
    component: IdVerify
  }, {
    path: '/personInfo',
    component: PersonInfo
  },
  {
    path: '/choose',
    component: Choose
  }
]
export default routes;