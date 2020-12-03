/*
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:28:16
 * @LastEditTime: 2020-12-03 19:28:35
 * @FillPath: Do not edit
 */

import Index from '@/views/Index/index';
import IdVerify from '@/views/Userinfo/IdVerify';
import Choose from '@/views/Userinfo/choose';
import PersonInfo from '@/views/Userinfo/personalInfo';
import Done from '@/views/Userinfo/done';
import ResetPassword from '@/views/Userinfo/password';
import ResetPasswordSuccess from '@/views/Userinfo/resetPasswordSuccess';
import MyCenter from '@/views/MyCenter/index';
import Settings from '@/views/MyCenter/settings';
import Resource from '@/views/MyCenter/resource';
import Invitecode from '@/views/MyCenter/inviteCode'
import Contactus from '@/views/MyCenter/contactUs'

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
  },
  {
    path: '/settings',
    component: Settings
  },
  {
    path: '/resource',
    component: Resource
  },
  {
    path: '/invitecode',
    component: Invitecode
  },
  {
    path: '/contactus',
    component: Contactus
  },

]
export default routes;