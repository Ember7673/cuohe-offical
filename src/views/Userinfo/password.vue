<!--
 * @Author: wangtengteng
 * @Date: 2020-11-26 11:22:55
 * @LastEditTime: 2020-12-07 14:19:43
 * @FillPath: Do not edit
-->
<template>
  <div class="password">
    <div class="content">
      <div class="title">
        密码重置
      </div>
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordRules" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="phone_num">
          <el-input type="tel" tabindex="1" maxlength="11" placeholder="请输入手机号码" v-model="passwordForm.phone_num">
          </el-input>
        </el-form-item>
        <el-form-item prop="valid_num">
          <el-input placeholder="请输入短信验证码" v-model="passwordForm.valid_num"></el-input>
          <div class="get-code">
            <span v-if="!isShowTimer" @click="getSMSCode">获取验证码</span>
            <span v-else>重新发送（{{smsTimer}}）秒</span>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" tabindex="2" maxlength="16" :show-password="true" placeholder="请输入密码" v-model="passwordForm.password">
          </el-input>
        </el-form-item>
      </el-form>
      <button class="btn" @click="onResetPassword">下一步</button>
    </div>

  </div>
</template>

<script>
import {
  checkValidCodeMoudle,
  resetPasswordMoudle,
  sendSMSCode,
} from '@/api/login';
import {
  uuid,
  Encrypt
} from "@/utils/index";
export default {
  data () {
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
    const checkPassword = (rule, value, callback) => {
      const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}');
      if (value === '') {
        return callback(new Error('请输入密码'));
      } else {

        if (value.match(/([\u4E00-\u9FA5])+/)) {
          return callback(new Error('不能包含中文字符'));
        }

        if (!pwdRegex.test(value)) {
          return callback(new Error('密码必须为8-16位数字、字母、符号组合'));
        }
        callback();
      }
    };
    return {
      passwordForm: {
        phone_num: '',
        valid_num: '',
        password: ''
      },
      smsTimer: 40,
      isShowTimer: false,
      passwordRules: {
        phone_num: [{
          required: true,
          validator: checkPhone,
          trigger: "blur"
        }],
        password: [{
          required: true,
          validator: checkPassword,
          trigger: "blur"
        }],
        valid_num: [{
          required: true,
          message: "请输入验证码",
          trigger: "blur"
        }]
      }
    }
  },
  created () {
    this.$auth.close();
  },
  methods: {
    //获取短信验证码
    getSMSCode () {
      const me = this;
      me.$refs['passwordRules'].validateField(['phone_num'], error => {
        if (!error) {
          const data = {
            phone_num: this.passwordForm.phone_num,
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
        }
      });
    },
    //短信验证码倒计时
    timer () {
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
    onResetPassword () {
      let me = this;
      this.$refs['passwordRules'].validate((valid) => {
        if (valid) {
          checkValidCodeMoudle({
            reqid: uuid(),
            phone_num: this.passwordForm.phone_num,
            valid_num: this.passwordForm.valid_num,
          }).then(res => {
            const {
              status,
              message
            } = res.data;
            if (!status) {
              resetPasswordMoudle({
                reqid: uuid(),
                phone_num: this.passwordForm.phone_num,
                valid_num: this.passwordForm.valid_num,
                password: Encrypt(this.passwordForm.password)
              }).then(resetPasswordRes => {
                const {
                  resetPasswordStatus,
                  resetPasswordMessage
                } = resetPasswordRes.data;
                if (!resetPasswordStatus) {
                  me.$message.success('密码重置成功');
                  me.$router.push('/resetPasswordSuccess');
                } else {
                  me.$message.error(resetPasswordMessage);
                }
              })
            } else if (status === 3030) {
              me.$message.error('验证码错误，请重新输入验证码');
            } else {
              me.$message.error(message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.password {
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

    /deep/ .el-form-item__content {
      margin-left: 0 !important;
      margin-bottom: 10px;
    }

    .title {
      font-size: 26px;
      color: #000;
      margin-bottom: 50px;
      text-align: center;
      font-weight: bold;
    }

    .get-code {
      cursor: pointer;
      position: absolute;
      right: 15px;
      bottom: 0;
    }

    .btn {
      width: 400px;
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