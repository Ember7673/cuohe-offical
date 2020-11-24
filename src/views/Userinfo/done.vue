<!--
 * @Author: wangtengteng
 * @Date: 2020-11-24 14:37:42
 * @LastEditTime: 2020-11-24 17:53:16
 * @FilePath: \cuohe-offical\src\views\Userinfo\done.vue
-->
<template>
  <div class="done">
    <div class="steps">
      <el-steps :space="200" :active="4" finish-status="success" align-center>
        <el-step title="身份验证"></el-step>
        <el-step title="选择账户"></el-step>
        <el-step title="完善信息"></el-step>
        <el-step title="注册完成"></el-step>
      </el-steps>
    </div>
    <div class="content">
      <div class="title">感谢您的注册</div>
      <p>您的账户申请我们已经收到，将尽快审核通过，感谢您对XXX的支持！请妥善保管您的账户信息，审批通过后会以短信的形式通知，请您敬请期待！</p>
      <div class="btn" @click="goIndex">进入首页</div>

    </div>

  </div>
</template>

<script>
export default {
  methods: {
    goIndex () {
      this.$router.push('/');
    }
  }
}
</script>

<style lang='scss' scoped>
.done {
  width: 100%;
  height: 100vh;
  position: relative;
  background: #fff;
  .steps {
    width: 900px;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    margin: 20px auto;

    /deep/ .el-step__title.is-success {
      color: #cf913f;
    }

    /deep/ .el-step__head.is-success {
      color: #cf913f;
      border-color: #cf913f;
    }
  }
  .content {
    width: 450px;
    position: absolute;
    top: 280px;
    left: 45%;
    transform: translateX(-50%);
    background: #ffffff;
    border: 1px solid #cccccc;
    box-shadow: 0px 15px 16px 2px rgba(1, 1, 1, 0.09);
    border-radius: 10px;
    padding: 40px;
    text-align: center;

    .title {
      font-size: 32px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      line-height: 32px;
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #4c4c4c;
      text-align: left;
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