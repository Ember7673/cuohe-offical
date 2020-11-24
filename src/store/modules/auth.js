/*
 * @Author: wangtengteng
 * @Date: 2020-11-22 11:10:26
 * @LastEditTime: 2020-11-24 18:24:05
 * @FilePath: \cuohe-offical\src\store\modules\auth.js
 */
const authStore = {
  namespaced: true,
  state: {
    userInfo: {},
    avatar: ''
  },
  mutations: {
    getUserInfo (state, data) {
      state.userInfo = data;
      window.localStorage.setItem('userInfo', JSON.stringify(data))
    },
    getAvatar (state, data) {
      state.avatar = data;
      window.localStorage.setItem('avatar', JSON.stringify(data))
    }
  },
  getters: {
    getUserInfoGetters: function (state) {
      return state.userInfo;
    }
  },
  actions: {
    putUserInfo ({ commit }, data) {
      commit('getUserInfo', data);
    }
  }
}

export default authStore;