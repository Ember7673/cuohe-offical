<!--
 * @Author: wangtengteng
 * @Date: 2020-11-20 19:45:15
 * @LastEditTime: 2020-12-07 14:38:13
 * @FillPath: Do not edit
-->
<template>
  <div class="header">
    <div class="header-content">
      <div class="logo">
        <router-link to="/">logo</router-link>
      </div>
      <div class="operation">
        <p class="translate">简体中文
        </p>
        <div v-show="!isLogged" class="notLogged">
          <p class="login" @click="$SignIn">
            登录
          </p>
          <p class="register" @click="$Register">注册</p>
        </div>
        <div v-show="isLogged" class="logged">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="curAvatar ? curAvatar : this.avatar" alt="">
              <!-- <p>{{isLogged && curUserInfo.phone_num}}</p> -->
            </span>
            <el-dropdown-menu slot="dropdown" style="width:'500px'; color:#F7941D;">
              <!-- <router-link to="/mycenter"> -->
              <el-dropdown-item @click.native="menuClick('mycenter')">
                我的需求
              </el-dropdown-item>
              <!-- </router-link> -->
              <!-- <router-link to="/resource"> -->
              <el-dropdown-item divided @click.native="menuClick('resource')">
                我的资源
              </el-dropdown-item>
              <!-- </router-link> -->
              <!-- <router-link to="/invitecode"> -->
              <el-dropdown-item v-show="level !== 3" divided @click.native="menuClick('invitecode')">
                邀请码
              </el-dropdown-item>
              <!-- </router-link> -->
              <!-- <router-link to="/settings"> -->
              <el-dropdown-item divided @click.native="menuClick('settings')">
                账号设置
              </el-dropdown-item>
              <!-- </router-link> -->
              <router-link to="/contactus">
                <el-dropdown-item divided>
                  联系我们
                </el-dropdown-item>
              </router-link>
              <span @click="onLogout">
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </span>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {
  getIsLogin,
  logout
} from '@/api/login';
import {
  mapState
} from 'vuex'
import {
  uuid,
  getCookie,
  setCookie,
  removeCookie,
  isEmptyObject
} from '@/utils/index';
export default {
  data () {
    return {
      isLogged: false,
      avatar: '',
      userInfo: {},
      level: 1
    }
  },
  computed: {
    curUserInfo () {
      const user = this.$store.state.auth.userInfo;
      return isEmptyObject(user) ? {} : JSON.parse(user);
    },
    curAvatar: {
      get () {
        if (this.$store.state.auth.avatar) {
          this.isLogged = true;
        }
        return this.$store.state.auth.avatar;
      },
      set (val) {

      }
    }
  },
  created () {
    if (getCookie('heat_sess_official')) {
      this.isLogged = true;
    }
    this.isLogin();
  },
  mounted () {
    this.avatar = window.localStorage.getItem('avatar').replace(/\"/g, "");
  },
  methods: {
    menuClick (url) {
      if (Number(this.userInfo.status) === 2 || Number(this.userInfo.status) === 5) {
        this.$message.warning('用户信息未审核');
        return;
      } else {
        this.$router.push(`/${url}`);
      }
    },
    isLogin () {
      getIsLogin({
        reqid: uuid()
      }).then(res => {
        const {
          status,
          message,
          user
        } = res.data;
        if (!status) {
          this.isLogged = true;
          this.userInfo = user;
          this.level = user.level;
          this.curAvatar = user.avatar;
          this.$auth.removeUserInfo();
          this.$store.commit('auth/getUserInfo', JSON.stringify(user))
          this.$store.commit('auth/getAvatar', user.avatar)
        } else if (status === 100) {
          this.isLogged = false;
        } else {
          this.isLogged = false;
          this.$message.error(message);
        }
      })
    },
    onLogout () {
      logout({
        reqid: uuid()
      }).then(res => {
        const {
          status,
          message
        } = res.data;
        if (!status) {
          this.$router.push('/');
          this.isLogged = false;
          this.$auth.removeUserInfo();
          this.$message.success('退出登录成功');
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background: #000;
  color: #fff;

  .header-content {
    width: 1200px;
    height: 70px;
    line-height: 70px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .logo {
      width: 200px;
      height: auto;
      font-size: 30px;
    }

    .operation {
      p {
        display: inline-block;
        margin-right: 25px;
        font-size: 16px;
        font-weight: 400;
        font-family: "Montserrat";
        cursor: pointer;
      }

      .notLogged {
        display: inline-block;
      }

      .logged {
        position: relative;
        display: inline-block;
        cursor: pointer;

        img {
          width: 40px;
          height: 40px;
          vertical-align: middle;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>