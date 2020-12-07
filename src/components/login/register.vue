<template>
  <div class="register">
    <div v-show="isShowRegisterPanel">
      <div class="title">成为合作伙伴</div>
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="demo-ruleForm" label-width="80px" label-position="right" hide-required-asterisk>
        <el-form-item prop="phone_num">
          <el-input v-model="registerForm.phone_num" placeholder="请输入手机号码">
          </el-input>
        </el-form-item>
        <el-form-item prop="valid_num">
          <el-input v-model="registerForm.valid_num" placeholder="请输入短信验证码">
          </el-input>
          <div class="get-code">
            <span v-if="!isShowTimer" @click="getSMSCode">获取验证码</span>
            <span v-else>重新发送（{{smsTimer}}）秒</span>
          </div>
        </el-form-item>
        <el-form-item prop="invite_code">
          <el-input v-model="registerForm.invite_code" placeholder="请输入邀请码">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" tabindex="2" maxlength="16" :show-password="true" v-model="registerForm.password" placeholder="请输入登录密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input type="password" tabindex="2" maxlength="16" :show-password="true" v-model="registerForm.repassword" placeholder="请再次输入登录密码">
          </el-input>
        </el-form-item>
      </el-form>
      <el-checkbox-group v-model="checkList" @change="onRulesChange">
        <el-checkbox label="1">《规则提示》</el-checkbox>
        <el-checkbox label="2">《保密协议》</el-checkbox>
      </el-checkbox-group>

      <button class="registerBtn" @click="onRegister">注册</button>

      <p class="hasAccount" @click="$SignIn">已有账号，立即登录</p>
    </div>

    <div class="rulesTip" v-if="isShowRulesTip && !isShowRegisterPanel">
      <div class="rulesTipBox">
        <p class="rulesTitle">规则提示</p>
        <p class="rulesContent">
          尊敬的用户，以下为平台规则：<br />
          1、对于我们来说，信誉重于生命!<br />
          2、本网站及数据库的建立已充分考虑诸位的安全及隐私需求，请放心使用<br />
          3、您的个人信息只有您个人可见，平台及其他用户均不可见，我们会完全、严格的遵守保密协议。<br />
          4、您发布的资源及需求只有您和平台的相关业务人员可见，其他用户均不可见，我们会完全、严格的遵守保密协议，<br />
          5、对于不方便在平台入库的要求，请联系我们的服务热线，沟通理解后将为您单独存档。<br />
          6、我们会全力以赴的去促使您的资源、需求落地，虽然不能够保证您每笔业务都会成功，但是会保证对您的个人隐私和发布的资源、需求完全保密。<br />
          7、我们绝不会跳单，使您的资源流失。<br />
          8、如果您对某笔业务的收益分配有所怀疑，我们接受您的审计。<br />
          9、每位介绍朋友加入平台的会员，通过您的朋友创造的利润，您按照比例也会获得利润的分配。<br />
          10、我们双方都需要签署保密协议，并严格遵守。
        </p>
        <el-button class="rulesBtn" @click="hideRulesTip">{{rulesButtonText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  register,
  getCosToken,
  cosUpload,
  sendSMSCode,
  createUser,
  accountLogin
} from "@/api/login";
import {
  uuid,
  Encrypt
} from "@/utils/index";
import router from '@/router';
export default {
  name: 'register',
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
    var checkFile = (rule, value, callback) => {
      if (!this.uploadCover) {
        return callback(new Error("请上传名片"));
      } else {
        callback();
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
    const checkConfirmPssword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'));
      } else {
        if (this.registerForm.password !== this.registerForm.repassword) {
          return callback(new Error('密码输入不一致，请重新输入'));
        } else {
          callback();
        }
      }
    };
    return {
      registerForm: {
        reqid: '',
        valid_num: '',
        phone_num: '',
        password: '',
        invite_code: '',
        repassword: ''
      },
      registerRules: {
        phone_num: [{
          required: true,
          validator: checkPhone,
          trigger: "blur"
        }],
        valid_num: [{
          required: true,
          message: "请输入短信验证码",
          trigger: "blur"
        }],
        invite_code: [{
          required: true,
          message: "请输入邀请码",
          trigger: "blur"
        }],
        password: [{
          required: true,
          validator: checkPassword,
          trigger: "blur"
        }],
        repassword: [{
          required: true,
          validator: checkConfirmPssword,
          trigger: "blur"
        }],
      },
      uploadCover: '',
      rulesTimer: 5,
      rulesButtonText: '5秒',
      isShowRulesTip: true,
      isShowRegisterPanel: false, //是否显示注册页面
      checkList: [],
      smsTimer: 40,
      isShowTimer: false,
    };
  },
  created () {
    window.addEventListener('keydown', this.handleKeyDown, true);
  },
  destroyed () {
    window.removeEventListener('keydown', this.handleKeyDown, true);
  },
  mounted () {
    this.timer();
  },
  methods: {
    timer () {
      const me = this;
      let _timeInterval = setInterval(function () {
        if (me.rulesTimer === 1) {
          me.rulesTimer = 5;
          me.rulesButtonText = '确定';
          clearInterval(_timeInterval);
        } else if (me.rulesTimer <= 5 && me.rulesTimer >= 1) {
          me.rulesTimer--;
          me.rulesButtonText = `${me.rulesTimer}秒`;
        }
      }, 1000);
    },
    //获取短信验证码
    getSMSCode () {
      this.$refs['registerForm'].validateField(['phone_num'], error => {
        if (!error) {
          const data = {
            phone_num: this.registerForm.phone_num,
            reqid: uuid()
          };
          sendSMSCode(data).then(res => {
            const {
              status,
              message
            } = res.data;
            if (!status) {
              this.$message.success('验证码已发送');
              this.SMStimer();
              this.isShowTimer = true;
            } else {
              this.$message({
                type: 'error',
                message: message,
                duration: 1500
              });
            }
          });
        }
      });
    },
    //短信验证码倒计时
    SMStimer () {
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
    hideRulesTip () {
      if (this.rulesButtonText === '确定') {
        this.isShowRulesTip = false;
        this.isShowRegisterPanel = true;
      }
    },
    onRulesChange (val) {
      this.checkList = val;
    },
    onRegister () {
      let me = this;
      this.$refs['registerForm'].validate(async (valid) => {
        if (valid) {
          if (this.checkList.length < 2) {
            this.$message.warning('请阅读并同意《规则提示》和《保密协议》');
            return;
          }
          createUser({
            reqid: uuid(),
            phone_num: me.registerForm.phone_num,
            valid_num: me.registerForm.valid_num,
            password: Encrypt(me.registerForm.password),
            invite_code: me.registerForm.invite_code
          }).then(res => {
            const {
              status,
              message
            } = res.data;
            if (!status) {
              this.$auth.close();
              this.$message.success('注册成功');
              this.onLogin();
            } else {
              this.$message.error(message);
            }
          })
        } else {
          return false;
        }
      });
    },
    onLogin: function () {
      let _this = this;
      const options = {
        phone_num: this.registerForm.phone_num,
        password: this.$md5(this.registerForm.password),
        reqid: uuid()
      }
      accountLogin(options).then(res => {
        const {
          status,
          user,
          message
        } = res.data;
        if (!status) {
          window.location.href = '/#/idverify';
        } else if (status === 7009) {
          this.$message.error('用户账号不存在');
        } else {
          this.$message.error(message);
        }
      });
    },
    handleKeyDown () {
      let key = null;
      if (window.event === undefined) {
        key = e.keyCode;
      } else {
        key = window.event.keyCode;
      }
      if (key === 13) {
        this.onRegister();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  position: relative;
  margin: 0 auto;
  // padding: 50px 40px 50px 40px;

  .title {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background: #4c4c4c;
    margin-bottom: 20px;
    color: #fff;
  }

  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #b37e2d;
    color: #b37e2d;
  }

  /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #b37e2d;
  }

  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: #b37e2d;
  }

  /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #b37e2d;
  }

  .rulesTip {
    .rulesTipBox {
      width: 420px;
      vertical-align: middle;
      background-color: #fff;
      border-radius: 4px;
      font-size: 18px;
      text-align: left;
      overflow: hidden;
      backface-visibility: hidden;
      color: #000;
      text-align: center;
    }

    .rulesTitle {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      margin-bottom: 20px;
    }

    .rulesContent {
      font-size: 14px;
      font-weight: 400;
      color: #4c4c4c;
      text-align: left;
      line-height: 25px;
    }

    .rulesBtn {
      margin-top: 20px;
    }

    .notClick {
      cursor: not-allowed;
    }

    /deep/.el-button:focus,
    .el-button:hover {
      color: #b37e2d;
      border: 1px solid #d6b583;
      background: #f3e5ce;
    }
  }

  /deep/ .el-form-item__content {
    margin-left: 0 !important;
    margin-bottom: 10px;
  }

  .get-code {
    cursor: pointer;
    position: absolute;
    right: 15px;
    bottom: 0;
  }

  .registerBtn {
    width: 100%;
    height: 40px;
    background-image: linear-gradient(#c08a35, #7b500e);
    border: none;
    margin-top: 20px;
  }

  .hasAccount {
    margin-top: 10px;
    cursor: pointer;
    color: #373737;
  }
}
</style>