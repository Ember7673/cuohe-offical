/*
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:28:16
 * @LastEditTime: 2020-11-26 22:16:47
 * @FillPath: Do not edit
 */

import Index from '@/views/Index/index';
import MyCenter from '@/views/MyCenter/index';
import IdVerify from '@/views/Userinfo/IdVerify';
import Choose from '@/views/Userinfo/choose';
import PersonInfo from '@/views/Userinfo/personalInfo';
import Done from '@/views/Userinfo/done';
import ResetPassword from '@/views/Userinfo/password';
import ResetPasswordSuccess from '@/views/Userinfo/resetPasswordSuccess';

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
  },
  {
    path: '/done',
    component: Done
  },
  {
    path: '/resetPassword',
    component: ResetPassword
  },
  {
    path: '/resetPasswordSuccess',
    component: ResetPasswordSuccess
  }
]
export default routes;