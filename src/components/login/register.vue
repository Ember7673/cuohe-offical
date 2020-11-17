<template>
  <div class="register">
    <h5>注册</h5>
    <el-form :model="registerForm" :rules="loginRules" ref="registerForm" class="demo-ruleForm" label-width="80px"
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
    <el-button round @click="onRegister">注册</el-button>
    <router-link to="/mycenter" class="login">去登录</router-link>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
        dialogVisible: false,
        registerForm: {
          reqid: '',
          name: '',
          area: '',
          card: '',
          card_file_name: '',
          phone_num: "",
          password: ""
        },
        loginRules: {
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
        uploadCover: ''
      };
    },
    methods: {
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

    .demo-ruleForm {
      padding: 0 30px;

      .el-icon-picture-outline {
        font-size: 35px;
      }

      .filesUpload {
        position: absolute;
        height: 38px;
        opacity: 0;
      }
    }

    .el-button {
      position: absolute;
      margin-top: 30px;
      left: 50%;
      transform: translateX(-50%);
      width: 250px;
      border-color: #409eff;
      color: #409eff;
    }

    .el-input {
      width: 80%;
    }

    .el-select {
      width: 100%;
    }

    .login {
      color: #409eff;
      position: absolute;
      margin-top: 80px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>