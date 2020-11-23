<!--
 * @Author: wangtengteng
 * @Date: 2020-11-20 19:45:15
 * @LastEditTime: 2020-11-23 22:55:16
 * @FillPath: Do not edit
-->
<template>
  <div class="header">
    <div class="header-content">
      <div class="logo">
        <router-link to="/">logo</router-link>
      </div>
      <div class="operation">
        <p class="translate">简体中文</p>
        <div v-show="!isLogged" class="notLogged">
          <p class="login" @click="$SignIn">
            登录
          </p>
          <p class="register" @click="$Register">注册</p>
        </div>
        <div v-show="isLogged" class="logged">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="../../assets/image/aboutus.png" alt="">
              <p>{{isLogged && getUserInfo.phone_num}}</p>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/mycenter">
                <el-dropdown-item>
                  个人中心
                </el-dropdown-item>
              </router-link>
              <span @click="onLogout">
                <el-dropdown-item>退出登录</el-dropdown-item>
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
    uuid,
    getCookie,
    setCookie,
    removeCookie
  } from '@/utils/index';
  export default {
    data() {
      return {
        isLogged: false,
        avatar: '',
      }
    },
    computed: {
      getUserInfo() {
        const user = JSON.parse(this.$store.state.auth.userInfo);
        return user;
      }
    },
    created() {
      console.log('userInfo-----', this.getUserInfo)
      if (!getCookie('heat_sess_official')) {
        this.isLogin();
      } else {
        this.isLogged = true;
        this.avatar = getCookie('userAvatar');
      }
    },
    methods: {
      isLogin() {
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
            this.$auth.removeUserInfo();
            this.$auth.setUserInfo(user);
          } else if (status === 100) {
            this.isLogged = false;
          } else {
            this.isLogged = false;
            this.$message.error(message);
          }
        })
      },
      onLogout() {
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
          font-family: Microsoft YaHei;
          font-size: 16px;
          font-weight: bold;
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

          .loggedPanel {
            width: 100px;
            position: absolute;
            top: 65px;
            left: 0;
            background: #fff;
            padding: 10px;
            z-index: 2;
            border: 1px solid #ebeef5;
            border-radius: 4px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

            li {
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              color: #606266;
            }
          }
        }
      }
    }
  }
</style>