<!--
 * @Author: wangtengteng
 * @Date: 2020-11-22 17:38:02
 * @LastEditTime: 2020-11-23 23:42:56
 * @FilePath: \cuohe-offical\src\views\Userinfo\IdVerification.vue
-->
<template>
  <div class="idVerify">
    <div class="steps">
      <el-steps :space="200" :active="0" finish-status="success" align-center>
        <el-step title="身份验证"></el-step>
        <el-step title="选择账户"></el-step>
        <el-step title="完善信息"></el-step>
        <el-step title="注册完成"></el-step>
      </el-steps>
    </div>
    <div class="verifyForm">
      <el-form :model="verifyForm" status-icon :rules="verifyRules" ref="ruleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item prop="id_card_num">
          <el-input placeholder="请输入身份证号码" v-model="verifyForm.id_card_num"></el-input>
        </el-form-item>
        <el-form-item prop="real_name">
          <el-input placeholder="请输入真实姓名" v-model="verifyForm.real_name"></el-input>
        </el-form-item>
      </el-form>
      <button class="btn" @click="onVerify">验证</button>
    </div>
  </div>
</template>

<script>
  import {
    verifyUserIdentity
  } from '@/api/login';
  import {
    uuid,
  } from "@/utils/index";
  export default {
    data() {
      var idValidate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号码'));
        } else if (value.length !== 18) {
          callback(new Error('身份证号码格式不正确!'));
        } else {
          callback();
        }
      };
      return {
        verifyForm: {
          id_card_num: '',
          real_name: ''
        },
        verifyRules: {
          id_card_num: {
            required: true,
            validator: idValidate,
            trigger: "blur"
          },
          real_name: {
            required: true,
            message: "请输入真实姓名",
            trigger: "blur"
          }
        }
      }
    },
    methods: {
      onVerify() {
        let me = this;
        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        console.log(userInfo)
        let user_id = userInfo.id;
        verifyUserIdentity({
          reqid: uuid(),
          user_id,
          id_card_num: this.verifyForm.id_card_num,
          real_name: this.verifyForm.real_name
        }).then(res => {
          const {
            status,
            message
          } = res.data;
          if (!status) {
            this.$router.push('/personInfo')
          } else {
            me.$message.error(res.data.message);
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .idVerify {
    width: 100%;
    height: 100%;
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
        color: #CF913F;
      }

      /deep/ .el-step__head.is-success {
        color: #CF913F;
        border-color: #CF913F;
      }
    }

    .verifyForm {
      position: absolute;
      top: 300px;
      left: 45%;
      transform: translateX(-50%);

      /deep/ .el-form-item__content {
        margin-left: 0 !important;
        width: 300px;
      }

      .btn {
        width: 300px;
        height: 40px;
        background: #CF913F;
        border-radius: 5px;
        border: none;
        color: #fff;
        margin: 0 auto;
        margin-top: 20px;
      }
    }


  }
</style>