<!--
 * @Author: wangtengteng
 * @Date: 2020-12-02 09:25:22
 * @LastEditTime: 2020-12-02 23:50:01
 * @FillPath: Do not edit
-->
<template>
  <div class="settings">
    <div class="header">
      <img class="avatar" :src="userInfo.avatar" alt="">
      <div class="info">
        <p class="nickname">{{userInfo.nickname}}</p>
        <p class="position">{{userInfo.position}}</p>
      </div>
      <div>
        <div class="number requireNumber">发布<span>{{requirementLength}}</span>次需求</div>
        <div class="number resourceNumber">提供<span>{{resourcesLength}}</span>次资源</div>
      </div>

    </div>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="账号设置" name="1">
          <div class="info line">
            <p><span>昵称：</span>{{userInfo.nickname}}</p>
            <p><span>手机号：</span>{{userInfo.phone_num}}</p>
            <p><span>账号身份：</span>{{userInfo.label ==='1' ? '资源提供方': userInfo.label==='2' ? '需求方' : '资源提供方；需求方'}}</p>
            <button class="editorNickname btn" @click="nicknameVisible = true;">编辑</button>
          </div>
          <div class="avatar line">
            <span>选择头像：</span>
            <img :src="selectedAvatar ? selectedAvatar : userInfo.avatar" alt="" @click="selectAvatar">
          </div>
          <div class="line"><span>行业类型：</span>{{userInfo.industry}}
            <button class="editorNickname btn" @click="industryVisible = true;">编辑</button>
          </div>
          <div class="line"><span>职位：</span>{{userInfo.position}}
            <button class="editorNickname btn" @click="positionVisible = true;">编辑</button>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="选择头像" :visible.sync="dialogVisible">
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
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改昵称" :visible.sync="nicknameVisible">
      <el-input placeholder="请输入昵称" v-model="userInfo.nickname" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="nicknameVisible = false">取 消</el-button>
        <el-button type="primary" @click="editNickname">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改行业类型" :visible.sync="industryVisible">
      <el-select v-model="userInfo.industry" placeholder="请选择">
        <el-option v-for="item in industryOptions" :key="item" :value="item">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="industryVisible = false">取 消</el-button>
        <el-button type="primary" @click="editIndustry">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改行业类型" :visible.sync="industryVisible">
      <el-input placeholder="请输入昵称" v-model="userInfo.industry" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="industryVisible = false">取 消</el-button>
        <el-button type="primary" @click="editIndustry">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getRequirementListMoudle,
    getResourceListMoudle
  } from '@/api/myCenter';
  import {
    getAvatarListMoudle,
    updateUserInfoMoudle,
    getIndustryListMoudle
  } from '@/api/login';
  import {
    uuid
  } from "@/utils/index";
  const AVATARURL = 'https://cuohe-1304244764.cos.ap-beijing.myqcloud.com/';
  export default {
    data() {
      return {
        userInfo: {},
        requirementLength: 0,
        resourcesLength: 0,
        activeName: '1',
        dialogVisible: false,
        avatarList: [],
        selectedAvatar: '',
        selectedAvatarIndex: 0,
        nicknameVisible: false,
        industryVisible: false,
        positionVisible: false,
        industryOptions: []
      }
    },
    created() {
      this.userInfo = JSON.parse(JSON.parse(window.localStorage.getItem('userInfo')));
      this.getRequirementList('1,2,3,4', 1, 1);
      this.getResourceList('1,2', 1, 1);
      this.getAvatarList();
    },
    methods: {
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
      getRequirementList(status, pageindex, pagesize) {
        let user_id = this.userInfo.id;
        getRequirementListMoudle({
          reqid: uuid(),
          status,
          user_id,
          pageindex,
          pagesize
        }).then(res => {
          const {
            status,
            data,
            message
          } = res.data;
          if (!status) {
            this.requirementLength = data.size;
          } else {
            this.$message.error(message);
          }
        })
      },
      getResourceList(status, pageindex, pagesize) {
        let user_id = this.userInfo.id;
        getResourceListMoudle({
          reqid: uuid(),
          status,
          user_id,
          pageindex,
          pagesize
        }).then(res => {
          const {
            status,
            data,
            message
          } = res.data;
          if (!status) {
            this.resourcesLength = data.size;
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
      },
      onConfirm() {
        updateUserInfoMoudle({
          reqid: uuid(),
          user_id: this.userInfo.id,
          avatar: this.selectedAvatar,
          industry: this.userInfo.industry,
          position: this.userInfo.position,
          label: this.userInfo.label,
          nickname: this.userInfo.nickname
        }).then(res => {
          const {
            status,
            message,
            data
          } = res.data;
          if (!status) {
            this.selectedAvatar = this.avatarList[this.selectedAvatarIndex];
            this.dialogVisible = false;
            this.$message.success('修改成功');
          } else {
            this.$message.error(message);
          }
        })
      },
      editNickname() {
        updateUserInfoMoudle({
          reqid: uuid(),
          user_id: this.userInfo.id,
          avatar: this.userInfo.avatar,
          industry: this.userInfo.industry,
          position: this.userInfo.position,
          label: this.userInfo.label,
          nickname: this.userInfo.nickname
        }).then(res => {
          const {
            status,
            message,
            data
          } = res.data;
          if (!status) {
            this.nicknameVisible = false;
            this.$message.success('修改成功');
          } else {
            this.$message.error(message);
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .settings {
    background: #fff;

    .header {
      width: 100%;
      height: 250px;
      background-image: url('../../assets/image/settingsBg.jpg');
      text-align: center;
      position: relative;
      color: #fff;

      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 100%;
        margin-top: 65px;
      }

      .info {
        display: inline-block;
        margin-left: 20px;

        .nickname {
          font-size: 20px;
          font-weight: bold;
          margin-top: 20px;
          text-align: left;
        }
      }

      .number {
        display: inline-block;
        font-size: 14px;
        margin: 30px 60px 0 0;

        span {
          font-size: 19px;
          font-weight: 500;
        }
      }
    }

    .content {
      width: 60%;
      margin: 0 auto;
      font-size: 14px;
      padding-bottom: 40px;
      color: #4C4C4C;

      /deep/ .el-tabs__nav {
        height: 80px;
        line-height: 80px;
      }

      /deep/ .el-tabs__item.is-active {
        color: #303133;
      }

      /deep/ .el-tabs__item:hover {
        color: #303133;
      }

      /deep/ .el-tabs__active-bar {
        background-color: #C99540;
        height: 3px;
      }

      /deep/ .el-tabs__item:focus.is-active.is-focus:not(:active) {
        box-shadow: none;
        border-radius: 0;
      }

      /deep/ .el-tabs__nav-wrap::after {
        background-color: #ECBE73;
      }

      div {
        position: relative;

        span {
          display: inline-block;
          width: 80px;
          text-align: right;
          line-height: 40px;
          margin-right: 20px;
        }

        .btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #C99540;
          color: #fff;
          padding: 5px 20px;
          border: none;
          outline: none;
        }
      }

      .line {
        border-bottom: 1px solid #D2D2D2;
        padding: 10px;
      }

      .avatar {
        img {
          width: 80px;
          height: 80px;
          border-radius: 100%;
          vertical-align: bottom;
        }
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