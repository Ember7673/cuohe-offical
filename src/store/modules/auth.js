/*
 * @Author: wangtengteng
 * @Date: 2020-11-22 11:10:26
 * @LastEditTime: 2020-11-23 17:02:03
 * @FilePath: \cuohe-offical\src\store\modules\auth.js
 */
const authStore = {
  namespaced: true,
  state: {
    userInfo: window.localStorage.getItem('userInfo'),
  },
  mutations: {
    getUserInfo(state, data) {
      state.userInfo = data;
      window.localStorage.setItem('userInfo', JSON.stringify(data))
    }
  },
}

export default authStore;