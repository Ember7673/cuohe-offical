<!--
 * @Author: wangtengteng
 * @Date: 2020-11-20 19:45:15
 * @LastEditTime: 2020-11-21 22:12:03
 * @FillPath: Do not edit
-->
<template>
  <div class="header">
    <div class="header-content">
      <div class="logo">
        <router-link to="/">logo</router-link>
      </div>
      <div class="operation">
        <p class="login" @click="$SignIn">
          登录
        </p>
        <p class="register" @click="$Register">注册</p>
        <p class="translate">简体中文</p>
      </div>
    </div>
  </div>

</template>

<script>
  import {
    getIsLogin
  } from '@/api/login';
  import {
    uuid
  } from '@/utils/index';
  export default {
    created() {
      this.isLogin();
    },
    methods: {
      isLogin() {
        getIsLogin({
          reqid: uuid()
        }).then(res => {
          console.log(res)
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
      height: 60px;
      line-height: 60px;
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

        .login {}

        .register {}

        .translate {}
      }
    }
  }
</style>