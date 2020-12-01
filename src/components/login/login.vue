<!--
 * @Author: wangtengteng
 * @Date: 2020-11-15 17:20:34
 * @LastEditTime: 2020-11-26 22:29:14
 * @FillPath: Do not edit
-->
<template>
  <!-- 登录 -->
  <div class="login">
    <div class="login-content">
      <div class="login-type">
        <button class="passwordBtn btn-type" :class="isShowPassword ? 'btn-shadow': ''"
          @click="onShowPassword">账号登录</button>
        <button class="accountBtn btn-type" :class="isShowPassword ? '': 'btn-shadow'"
          @click="onShowAccount">短信登录</button>
      </div>
      <div v-show="isShowPassword" class="password">
        <!-- 密码登录 -->
        <el-form :model="loginForm" :rules="rules" ref="passwordLoginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="phone_num">
            <el-input placeholder="请输入账号" type="tel" tabindex="1" maxlength="11" v-model="loginForm.phone_num">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" tabindex="2" maxlength="16" :show-password="true" placeholder="请输入密码"
              v-model="loginForm.password">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="!isShowPassword" class="account">
        <!-- 验证码登录 -->
        <el-form :model="loginForm" :rules="rules" ref="accountLoginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="phone_num">
            <el-input class="mobileSignInInput" type="tel" tabindex="1" maxlength="11" placeholder="请输入手机号码"
              v-model="loginForm.phone_num">
              <template slot="prefix">
                <span>+86</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input placeholder="请输入验证码" v-model="loginForm.code"></el-input>
            <div class="get-code">
              <span v-if="!isShowTimer" @click="getSMSCode">获取验证码</span>
              <span v-else>重新发送（{{smsTimer}}）秒</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="loginBtn">
        <button v-show="isShowPassword" @click="onAccountLogin">登录</button>
        <button v-show="!isShowPassword" @click="onSMSLogin">登录</button>
      </div>

      <p class="toRegister" @click="$Register">立即注册</p>
    </div>

  </div>
</template>


<script>
  import {
    sendSMSCode,
    accountLogin,
    smsLogin
  } from '@/api/login';
  import {
    uuid,
    setCookie,
  } from "@/utils/index";
  import store from '@/store';
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
        isShowTimer: false,
        isShowPassword: true,
      };
    },
    created() {
      window.addEventListener('keydown', this.handleKeyDown, true);
    },
    destroyed() {
      window.removeEventListener('keydown', this.handleKeyDown, true);
    },
    methods: {
      //获取短信验证码
      getSMSCode() {
        const me = this;
        const data = {
          phone_num: this.loginForm.phone_num,
          reqid: uuid()
        };
        sendSMSCode(data).then(res => {
          const {
            status,
            message
          } = res.data;
          if (!status) {
            me.$message.success('验证码已发送');
            me.timer();
            me.isShowTimer = true;
          } else {
            me.$message.error(res.data.message);
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
        this.$refs['passwordLoginForm'].validate((valid) => {
          if (valid) {
            const options = {
              phone_num: this.loginForm.phone_num,
              password: this.$md5(this.loginForm.password),
              reqid: uuid()
            }
            accountLogin(options).then(res => {
              const {
                status,
                user,
                message
              } = res.data;
              if (!status) {
                this.$auth.close();
                store.commit('auth/getUserInfo', JSON.stringify(user))
                store.commit('auth/getAvatar', user.avatar)

                this.$message.success('登录成功');
              } else if (status === 7009) {
                this.$message.error('用户账号不存在');
              } else {
                this.$message.error(message);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 验证码登录
      onSMSLogin() {
        this.$refs['accountLoginForm'].validate((valid) => {
          if (valid) {
            const options = {
              phone_num: this.loginForm.phone_num,
              valid_num: this.loginForm.code,
              reqid: uuid()
            }
            smsLogin(options).then(res => {
              const {
                status,
                user,
                message
              } = res.data;
              if (!status) {
                this.$auth.close();
                store.commit('auth/getUserInfo', JSON.stringify(user))
                store.commit('auth/getAvatar', user.avatar)
                this.$message.success('登录成功');
              } else if (status === 7009) {
                this.$message.error('用户不存在，请先注册账号');
              } else if (status === 3030) {
                this.$message.error('验证码错误');
              } else {
                this.$message.error(message);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //键盘事件
      handleKeyDown(e) {
        let key = null;
        if (window.event === undefined) {
          key = e.keyCode;
        } else {
          key = window.event.keyCode;
        }
        if (key === 13) {
          if (this.isShowPassword) {
            this.onAccountLogin();
          } else {
            this.onSMSLogin();
          }
        }
      },
      // 显示密码页面
      onShowPassword() {
        this.$refs['passwordLoginForm'].resetFields();
        this.isShowPassword = true;
      },
      // 显示验证码登录页面
      onShowAccount() {
        this.$refs['accountLoginForm'].resetFields();
        this.isShowPassword = false;
      }
    }
  }
</script>
<style scoped lang="scss">
  .login {
    margin: 0 auto;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;

    .login-content {
      // background: #fff;

      .btn-type {
        width: 173px;
        height: 38px;
        border-radius: 2px;
        color: #ccc;
        outline: none;
        border: none;
        margin-bottom: 30px;
      }

      .passwordBtn {
        margin-right: 10px;
      }

      .btn-shadow {
        background: #4c4c4c;
        color: #fff;
        box-shadow: 3px 3px 10px rgba($color: #000, $alpha: 0.4);
      }

      /deep/ .el-form-item__content {
        margin-left: 0 !important;
        margin-bottom: 10px;
      }

      .loginBtn {
        button {
          width: 100%;
          height: 40px;
          background-image: linear-gradient(#c08a35, #7b500e);
          border: none;
        }
      }

      .password {
        /deep/ .el-input__inner {
          &:focus {
            border-color: #b37e2d;
          }
        }
      }

      .account {
        position: relative;

        /deep/ .el-input__inner {
          &:focus {
            border-color: #b37e2d;
          }
        }

        .mobileSignInInput {
          /deep/ .el-input__inner {
            padding-left: 70px;
          }
        }

        /deep/ .el-input__prefix {
          span {
            display: block;
            height: 27px;
            line-height: 27px;
            border-right: 1px solid #ebebeb;
            margin-top: 6px;
            padding: 0 15px;
            font-size: 14px;
            color: #333;
            font-weight: 400;
          }
        }

        .get-code {
          cursor: pointer;
          position: absolute;
          right: 15px;
          bottom: 0;
        }
      }

      .toRegister {
        margin-top: 10px;
        cursor: pointer;
        color: #373737;
      }
    }
  }
</style>