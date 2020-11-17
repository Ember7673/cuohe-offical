<!--
 * @Author: wangtengteng
 * @Date: 2020-11-15 17:20:34
 * @LastEditTime: 2020-11-17 11:19:49
 * @FillPath: Do not edit
-->
<!--
 * @Author: wangtengteng
 * @Date: 2020-11-15 17:20:34
 * @LastEditTime: 2020-11-16 10:05:46
 * @FillPath: Do not edit
-->
<template>
  <!-- 登录 -->
  <div class="login">
    <div class="password">
      <!-- 密码登录 -->
      <el-form :model="loginForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="phone_num">
          <el-input v-model="loginForm.phone_num"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="account">
      <!-- 账号登录 -->
      <el-form :model="loginForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="phone_num">
          <el-input v-model="loginForm.phone_num"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="loginForm.code"></el-input>
          <div>
            <span v-if="!isShowTimer" @click="getSMSCode">获取验证码</span>
            <span v-else>重新发送（{{smsTimer}}）秒</span>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button @click="onAccountLogin">登录</el-button>
    </div>
  </div>
</template>


<script>
  import {
    sendSMSCode,
    accountLogin
  } from '@/api/login';
  import {
    uuid,
    setCookie
  } from "@/utils/index";
  export default {
    name: 'login',
    data() {
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[34578]\d{9}$$/;
        if (!value) {
          return callback(new Error("电话号码不能为空"));
        }
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      };
      return {
        loginForm: {
          phone_num: '',
          password: '',
          code: ''
        },
        rules: {
          phone_num: [{
            required: true,
            validator: checkPhone,
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入登录密码",
            trigger: "blur"
          }],
          code: [{
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }]
        },
        smsTimer: 40,
        isShowTimer: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log(loginForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //获取短信验证码
      getSMSCode() {
        const me = this;
        const data = {
          phone_num: this.loginForm.phone_num,
          reqid: uuid()
        };
        sendSMSCode(data).then(res => {
          console.log(res)
          const {
            status,
            message
          } = res;
          if (!status) {
            me.$message.success('验证码已发送');
            me.timer();
            me.isShowTimer = true;
          } else {
            me.$message({
              type: 'error',
              message: res.message,
              duration: 1500
            });
          }
        });
      },
      //短信验证码倒计时
      timer() {
        const me = this;
        let _timeInterval = setInterval(function () {
          if (me.smsTimer === 0) {
            me.isShowTimer = false;
            me.smsTimer = 40;
            clearInterval(_timeInterval);
          } else if (me.smsTimer <= 40 && me.smsTimer >= 1) {
            me.isShowTimer = true;
            me.smsTimer--;
          }
        }, 1000);
      },
      // 账号密码登录
      onAccountLogin() {
        const options = {
          phone_num: this.loginForm.phone_num,
          password: this.$md5(this.loginForm.password),
          reqid: uuid()
        }
        accountLogin(options).then(res => {
          console.log(res)
        })
      }
      // 验证码登录

    }
  }
</script>
<style scoped lang="scss">
  .login {
    width: 600px;
  }
</style>