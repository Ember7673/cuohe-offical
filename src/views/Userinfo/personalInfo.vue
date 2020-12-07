<!--
 * @Author: wangtengteng
 * @Date: 2020-11-24 09:25:37
 * @LastEditTime: 2020-12-07 23:14:37
 * @FilePath: \cuohe-offical\src\views\Userinfo\personalInfo.vue
-->
<template>
  <div class="personInfo">
    <div class="steps">
      <el-steps :space="200" :active="2" finish-status="success" align-center>
        <el-step title="身份验证"></el-step>
        <el-step title="选择账户"></el-step>
        <el-step title="完善信息"></el-step>
        <el-step title="注册完成"></el-step>
      </el-steps>
    </div>
    <div class="content">
      <el-form :model="InfoForm" status-icon :rules="rules" ref="InfoForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="选择头像：" prop="avatar">
          <img v-if="!selectedAvatar" class="avatar" src='../../assets/image/defaultAvatar.png' alt=""
            @click="selectAvatar">
          <img v-else class="avatar" :src="selectedAvatar" alt="" @click="selectAvatar">
        </el-form-item>
        <el-form-item class="nickname" label="昵称：" prop="nickname">
          <el-input v-model="InfoForm.nickname" @input="nicknameChange"></el-input>
          <!-- <span class="exist">昵称已存在，请更换昵称</span> -->
        </el-form-item>
        <el-form-item label="行业类型：" prop="industry">
          <el-select v-model="InfoForm.industry" placeholder="请选择">
            <el-option v-for="item in industryOptions" :key="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位：" prop="position">
          <el-select v-model="InfoForm.position" placeholder="请选择">
            <el-option v-for="item in positionOptions" :key="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <button class="btn" @click="onSubmit">完成</button>
    </div>
    <el-dialog customClass="customDialog" title="选择头像" :visible.sync="dialogVisible">
      <ul>
        <li class="avatarList" v-for="(item, index) in avatarList" :key="index">
          <img :src="item" alt="" @click="chooseAvatar(index)">
          <div :class="selectedAvatarIndex === index ? 'selected' : ''">
            <img v-show="selectedAvatarIndex === index" src="../../assets/image/selectedAvatar.png" alt="">
          </div>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getIndustryListMoudle,
    getPositionListMoudle,
    checkNnickNameExistMoudle,
    getAvatarListMoudle,
    setUserInfoMoudle,
    getIsLogin
  } from '@/api/login';
  import {
    uuid,
    throttle
  } from "@/utils/index";
  const AVATARURL = 'https://cuohe-1304244764.cos.ap-beijing.myqcloud.com/';
  export default {
    data() {
      var checkNickname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        } else if (this.nicknameExit) {
          callback(new Error('昵称已存在，请更换昵称!'));
        } else {
          callback();
        }
      };
      return {
        InfoForm: {
          avatar: '',
          nickname: '',
          industry: '',
          position: '',
        },
        rules: {
          avatar: {
            required: true,
            message: "请选择头像",
            trigger: "blur"
          },
          nickname: {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          },
          industry: {
            required: true,
            message: "请选择行业类型",
            trigger: "blur"
          },
          position: {
            required: true,
            message: "请选择职位",
            trigger: "blur"
          }
        },
        industryOptions: [],
        positionOptions: [],
        nicknameExit: false,
        avatarList: [],
        selectedAvatar: '',
        selectedAvatarIndex: 0,
        dialogVisible: false,
        label: ''
      }
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
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
            if (Number(user.status) !== 1) {
              this.$message.warning('暂未到完善信息流程');
              this.$router.push('/');
              return;
            }
            this.getAvatarList();
            this.getIndustryList();
            this.getPositionList();
            this.label = this.$route.query.label;
          } else {
            this.$message.error(message);
          }
        })
      },
      selectAvatar() {
        this.dialogVisible = true;
      },
      getAvatarList() {
        getAvatarListMoudle({
          reqid: uuid()
        }).then(res => {
          const {
            status,
            message,
            data
          } = res.data;
          if (!status) {
            this.avatarList = data.map(item => AVATARURL + item);
          } else {
            this.$message.error(message);
          }
        })
      },
      chooseAvatar(index) {
        this.selectedAvatarIndex = index;
        this.selectedAvatar = this.avatarList[index];
      },
      getIndustryList() {
        getIndustryListMoudle({
          reqid: uuid()
        }).then(res => {
          const {
            status,
            message,
            data
          } = res.data;
          if (!status) {
            this.industryOptions = data;
          } else {
            this.$message.error(message);
          }
        })
      },
      getPositionList() {
        getPositionListMoudle({
          reqid: uuid()
        }).then(res => {
          const {
            status,
            message,
            data
          } = res.data;
          if (!status) {
            this.positionOptions = data;
          } else {
            this.$message.error(message);
          }
        })
      },
      checkNnickNameExist(nick_name) {
        throttle(
          checkNnickNameExistMoudle({
            reqid: uuid(),
            nick_name
          }).then(res => {
            const {
              status,
              message,
              exist
            } = res.data;
            if (!status) {
              this.nicknameExit = exist;
            } else {
              this.$message.error(message);
            }
          }), 2000)
      },
      nicknameChange(val) {
        if (!val) return;
        this.checkNnickNameExist(val)
      },
      onSubmit() {
        if (!this.selectedAvatar) {
          this.$message.warning('请选择头像');
          return;
        }
        let user_id = this.userInfo.id;
        setUserInfoMoudle({
          reqid: uuid(),
          user_id,
          avatar: this.selectedAvatar,
          industry: this.InfoForm.industry,
          position: this.InfoForm.position,
          label: this.label,
          nickname: this.InfoForm.nickname
        }).then(res => {
          const {
            status,
            message,
            data
          } = res.data;
          if (!status) {
            this.$router.push('/done');
            this.$message.success('提交成功');
          } else {
            this.$message.error(message);
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .personInfo {
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
      width: 400px;
      position: absolute;
      top: 280px;
      left: 45%;
      transform: translateX(-50%);

      .nickname {
        position: relative;
      }

      /deep/ .el-input--suffix .el-input__inner {
        width: 300px;
      }

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
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
        margin-left: 100px;
      }
    }

    .avatarList {
      display: inline-block;
      position: relative;
      margin: 10px 30px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .selected {
        background: rgba($color: #000000, $alpha: 0.35);
        width: 50px;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;

        img {
          width: 34px;
          height: auto;
          position: absolute;
          top: 20px;
          left: 12px;
        }
      }
    }
  }
</style>