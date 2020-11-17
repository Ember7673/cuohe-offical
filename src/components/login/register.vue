<template>
  <div class="register">
    <!-- <h5>注册</h5> -->
    <el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="demo-ruleForm" label-width="80px"
      label-position="right" hide-required-asterisk>
      <el-form-item prop="tel">
        <el-input v-model="registerForm.tel" placeholder="请输入手机号码">
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="registerForm.code" placeholder="请输入短信验证码">
        </el-input>
      </el-form-item>
      <el-form-item prop="inviteCode">
        <el-input v-model="registerForm.inviteCode" placeholder="请输入邀请码">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" placeholder="请输入登录密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input v-model="registerForm.repassword" placeholder="请输入登录密码">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="rulesTip" v-if="isShowRulesTip">
      <div class="v-modal" tabindex="0" style="z-index: 2025;">
      </div>
      <div class="rulesTipBox">
        <p class="rulesTitle">规则提示</p>
        <p class="rulesContent">
          发上来大家发送旅客当机立断就放声大哭
          发上来大家发送旅客当机立断就放声大哭
          发上来大家发送旅客当机立断就放声大哭
        </p>
        <el-button @click="hideRulesTip">{{rulesButtonText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  // import {
  //   register,
  //   getCosToken,
  //   cosUpload
  // } from "@/api/login";
  // import {
  //   uuid
  // } from "@/utils/index";
  export default {
    name: 'register',
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
      var checkFile = (rule, value, callback) => {
        if (!this.uploadCover) {
          return callback(new Error("请上传名片"));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          reqid: '',
          name: '',
          area: '',
          card: '',
          card_file_name: '',
          phone_num: "",
          password: ""
        },
        registerRules: {
          tel: [{
            required: true,
            validator: checkPhone,
            trigger: "blur"
          }],
          code: [{
            required: true,
            message: "请输入短信验证码",
            trigger: "blur"
          }],
          inviteCode: [{
            required: true,
            message: "请输入邀请码",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入登录密码",
            trigger: "blur"
          }],
          repassword: [{
            required: true,
            message: "请再次输入登录密码",
            trigger: "blur"
          }],
        },
        uploadCover: '',
        rulesTimer: 5,
        rulesButtonText: '请认真阅读规则提示（5）秒',
        isShowRulesTip: true
      };
    },
    mounted() {
      this.timer();
    },
    methods: {
      timer() {
        const me = this;
        let _timeInterval = setInterval(function () {
          if (me.rulesTimer === 0) {
            me.rulesTimer = 5;
            me.rulesButtonText = '确定';
            clearInterval(_timeInterval);
          } else if (me.rulesTimer <= 5 && me.rulesTimer >= 1) {
            me.rulesTimer--;
            me.rulesButtonText = `请认真阅读规则提示（${me.rulesTimer}）秒`;
          }
        }, 1000);
      },
      hideRulesTip() {
        if (this.rulesButtonText === '确定') {
          console.log(11)
          this.isShowRulesTip = false;
        }
      },
      onRegister() {
        this.$refs['registerForm'].validate(async (valid) => {
          if (valid) {
            if (!this.registerForm.card) {
              this.$message.warn('请上传名片');
              return false;
            }
            await register({
              ...this.registerForm,
            }).then(res => {
              if (res.data.status === 0) {
                this.$message.success('注册成功！')
              } else if (res.data.status === 7008) {
                this.$message.warn('用户已存在，请直接登录')
              } else {
                this.$message.error(res.data.message)
              }
            });
          } else {
            return false;
          }
        });
      },
      async onFilesUpload(e) {
        const files = event.target.files[0];
        if (!event || !window.FileReader) {
          return
        } // 看支持不支持FileReader
        const reader = new FileReader()
        reader.readAsDataURL(files)
        reader.onloadend = () => {
          this.uploadCover = reader.result;
        }
        const reqid = uuid();
        const suffix = files.name.split('.')[1];
        this.registerForm.card_file_name = files.name;
        this.registerForm.reqid = reqid;
        const file_name = reqid + '.' + suffix;
        this.registerForm.card = file_name;
        await getCosToken({
          reqid,
          method: 1,
          file_name
        }).then(async res => {
          const {
            url,
            token
          } = res.data.detail;
          await cosUpload({
            url,
            token
          })
        })
      }
    }
  };
</script>

<style lang="scss">
  .register {
    position: relative;
    margin: 0 auto;

    h5 {
      margin-top: 20%;
      text-align: center;
      font-size: 30px;
    }

    .rulesTip {

      .rulesTipBox {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        z-index: 4000;
        width: 420px;
        padding: 20px;
        vertical-align: middle;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        font-size: 18px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        text-align: left;
        overflow: hidden;
        backface-visibility: hidden;
        color: #000;
        text-align: center
      }
    }
  }
</style>