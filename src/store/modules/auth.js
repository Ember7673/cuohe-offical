/*
 * @Author: wangtengteng
 * @Date: 2020-11-22 11:10:26
 * @LastEditTime: 2020-11-22 11:41:06
 * @FilePath: \cuohe-offical\src\store\modules\auth.js
 */
const authStore = {
  namespaced: true,
  state: {
    userInfo: {},
  },
  mutations: {
    getUserInfo (state, context) {
      state.userInfo = conext.userInfo;
    }
  },
  actions: {

  }
}

export default authStore;