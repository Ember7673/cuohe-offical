<!--
 * @Author: wangtengteng
 * @Date: 2020-12-02 23:50:49
 * @LastEditTime: 2020-12-10 16:14:00
 * @FillPath: Do not edit
-->
<template>
  <div class="inviteCode">
    <SettingHeader />
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="邀请码列表" name="1">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="invite_code" label="邀请码" width="180">
            </el-table-column>
            <el-table-column prop="create_time" label="生成时间" width="180">
            </el-table-column>
            <el-table-column prop="create_user" label="创建者">
            </el-table-column>
            <el-table-column prop="bind_user_id" label="绑定者">
            </el-table-column>
            <el-table-column prop="bind_user_phone" label="手机号">
            </el-table-column>
            <el-table-column prop="statusText" label="状态">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="创建邀请码" name="2">
          <el-input class="inviteCodeInput" placeholder="请创建邀请码" v-model="inviteCode"></el-input>
          <div>
            <button class="createBtn btn" @click="createCode">生成邀请码</button>
            <button class="copyBtn btn" @click="copyCode">复制邀请码</button>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SettingHeader from '@/components/common/settingHeader'
import {
  inviteCodeMoudle,
  createInviteCodeMoudle
} from '@/api/myCenter';
import {
  getAvatarListMoudle,
  updateUserInfoMoudle,
  getIndustryListMoudle,
  getIsLogin
} from '@/api/login';
import {
  uuid
} from "@/utils/index";
export default {
  components: {
    SettingHeader
  },
  data () {
    return {
      activeName: '1',
      userInfo: {},
      tableData: [],
      requirementLength: 0,
      resourcesLength: 0,
      inviteCode: '',
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
          if (Number(this.userInfo.status) === 1 || Number(this.userInfo.status) === 2) {
            this.$message.warning('用户信息未审核');
            this.$router.push('/');
            return;
          }
          this.getInviteCode();
        } else {
          this.$message.error(message);
        }
      })
    },
    handleTabsClick (tab) {
      if (tab.name === '1') {
        this.getInviteCode();
      }
    },
    getInviteCode () {
      inviteCodeMoudle({
        user_id: this.userInfo.id,
        reqid: uuid()
      }).then(res => {
        const {
          status,
          data,
          message
        } = res.data;
        if (!status) {
          this.tableData = data;
          this.tableData.forEach(item => {
            if (item.status === '1') {
              item.statusText = '生成未使用';
            } else {
              item.statusText = '生成已使用';
            }
          })
        } else {
          this.$message.error(message);
        }
      })
    },
    createCode () {
      if (Number(this.userInfo.status) <= 5) {
        this.$message.warning('用户信息未审核');
        return;
      }
      createInviteCodeMoudle({
        user_id: this.userInfo.id,
        reqid: uuid()
      }).then(res => {
        const {
          status,
          invite_code,
          message
        } = res.data;
        if (!status) {
          this.inviteCode = invite_code;
        } else {
          this.$message.error(message);
        }
      })
    },
    copyCode () {
      if (!this.inviteCode) return;
      this.copyShaneUrl(this.inviteCode);
      this.$message.success('复制成功');
    },
    copyShaneUrl (shareLink) {
      var input = document.createElement("input"); // 直接构建input
      input.value = shareLink; // 设置内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
    }
  }
}
</script>

<style lang="scss" scoped>
.inviteCode {
  height: 100vh;
  background: #fff;

  .content {
    width: 60%;
    margin: 0 auto;
    font-size: 14px;
    padding-bottom: 40px;
    color: #4c4c4c;
    text-align: center;

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
      background-color: #c99540;
      height: 3px;
    }

    /deep/ .el-tabs__item:focus.is-active.is-focus:not(:active) {
      box-shadow: none;
      border-radius: 0;
    }

    /deep/ .el-tabs__nav-wrap::after {
      background-color: #ecbe73;
    }

    .inviteCodeInput {
      width: 300px;
      margin-top: 30px;
    }

    .btn {
      width: 90px;
      height: 30px;
      line-height: 30px;
      background-color: #ecbe73;
      color: #fff;
      border: none;
      margin: 40px 0;
    }

    .createBtn {
      margin-right: 40px;
    }

    .copyBtn {
    }
  }
}
</style>