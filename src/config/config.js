/*
 * @Author: wangtengteng
 * @Date: 2020-11-24 18:06:42
 * @LastEditTime: 2020-12-07 15:47:53
 * @FilePath: \cuohe-offical\src\config\config.js
 */
const errorCode = {
  7010: {
    'en': 'DB error',
    'zh': '数据库错误'
  },
  7009: {
    'en': 'not exist',
    'zh': '不存在此数据'
  },
  7013: {
    'en': 'please get valid code firstly',
    'zh': '请先获取短信验证码'
  },
  7014: {
    'en': 'valid code expired, only has 5 minutes lift-time, please get again',
    'zh': '验证码已过期（有效期5分钟），请重新获取'
  },
  7015: {
    'en': 'invite_code not exist',
    'zh': '邀请码不存在'
  },
  7016: {
    'en': 'invite_code already used',
    'zh': '邀请码已使用'
  },
  7017: {
    'en': 'invite_code generate by platform',
    'zh': '邀请码由平台生成，非用户创建'
  },
  7008: {
    'en': 'this account already exist',
    'zh': '此账号已存在'
  },
  3030: {
    'en': 'parameter valid_num is wrong',
    'zh': '验证码错误'
  },
  3031: {
    'en': 'parameter invite_code is wrong',
    'zh': '邀请码错误'
  },
  3009: {
    'en': 'parameter password is wrong',
    'zh': '密码错误'
  },
  7012: {
    'en': 'wrong password',
    'zh': '密码错误'
  },
  5001: {
    'en': 'network unstable, please wait awhile and retry',
    'zh': '网络不稳定，请稍后重试'
  },
  3003: {
    'en': 'parameter is wrong, please check',
    'zh': '参数错误，请检查'
  },
  100: {
    'en': 'user not login',
    'zh': '用户未登录'
  },
  101: {
    'en': 'user id card verify fail',
    'zh': '身份证号验证失败'
  },
  3014: {
    'en': 'parameter user_id is wrong',
    'zh': '用户id错误'
  },
}

export default errorCode;