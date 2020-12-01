<!--
 * @Author: wangtengteng
 * @Date: 2020-11-26 22:10:56
 * @LastEditTime: 2020-11-27 11:09:33
 * @FillPath: Do not edit
-->
<template>
  <div class="success">
    <div class="content">
      <div class="title">
        密码重置成功
      </div>
      <img src="../../assets/image/resetPassword.png" alt="">
      <p>密码重置成功，请妥善保管您的账户信息</p>
      <button class="btn" @click="goIndex">进入首页</button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goIndex() {
        this.$router.push('/');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .success {
    width: 100%;
    height: 100%;
    position: relative;
    background: #fff;

    .content {
      width: 400px;
      position: absolute;
      top: 100px;
      left: 45%;
      transform: translateX(-50%);
      text-align: center;

      .title {
        font-size: 26px;
        color: #000;
        margin-bottom: 50px;
        font-weight: bold
      }

      img {
        display: inline-block;
        margin: 0 auto;
      }

      .btn {
        width: 300px;
        height: 30px;
        line-height: 30px;
        background: #cf913f;
        border-radius: 5px;
        border: none;
        color: #fff;
        margin: 0 auto;
        margin-top: 50px;
      }
    }
  }
</style>