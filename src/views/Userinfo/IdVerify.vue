<!--
 * @Author: wangtengteng
 * @Date: 2020-11-22 17:38:02
 * @LastEditTime: 2020-12-08 11:33:24
 * @FilePath: \cuohe-offical\src\views\Userinfo\IdVerify.vue
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
      <el-form :model="verifyForm" status-icon :rules="verifyRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
  verifyUserIdentity,
  getIsLogin
} from '@/api/login';
import {
  uuid,
} from "@/utils/index";
export default {
  data () {
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
      },
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo();
  },
  methods: {
    getUserInfo () {
      getIsLogin({
        reqid: uuid()
      }).then(res => {
        const {
          status,
          message,
          user
        } = res.data;
        if (!status) {
          this.userInfo = user;
        } else {
          this.$message.error(message);
        }
      })
    },
    onVerify () {
      let me = this;
      let user_id = me.userInfo.id;
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
          this.$router.push('/choose');
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
      color: #cf913f;
    }

    /deep/ .el-step__head.is-success {
      color: #cf913f;
      border-color: #cf913f;
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
      background: #cf913f;
      border-radius: 5px;
      border: none;
      color: #fff;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
}
</style>