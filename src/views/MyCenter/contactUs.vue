<!--
 * @Author: wangtengteng
 * @Date: 2020-12-03 19:27:18
 * @LastEditTime: 2020-12-10 16:15:04
 * @FillPath: Do not edit
-->
<template>
  <div class="contactUs">
    <SettingHeader />
    <div class="content">
      <el-tabs>
        <el-tab-pane label="联系我们">
          <p>客服电话：<span>{{phone_num}}</span></p>
          <p>客服经理：<span>{{userInfo.cooperation_num}}</span></p>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import SettingHeader from '@/components/common/settingHeader'
import {
  customerServicePhoneNumMoudle,
  getIsLogin
} from '@/api/login';
import {
  uuid
} from '@/utils/index';
export default {
  components: {
    SettingHeader
  },
  data () {
    return {
      phone_num: '',
      requirementLength: 0,
      resourcesLength: 0,
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
          this.getPhoneNum();
        } else {
          this.$message.error(message);
        }
      })
    },
    getPhoneNum () {
      customerServicePhoneNumMoudle({
        reqid: uuid()
      }).then(res => {
        const {
          status,
          message,
          phone_num
        } = res.data;
        if (!status) {
          this.phone_num = phone_num;
        } else {
          this.$message.error(message);
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.contactUs {
  height: 100vh;
  background: #fff;

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

  .content {
    width: 60%;
    margin: 0 auto;
    font-size: 14px;
    padding-bottom: 40px;
    color: #4c4c4c;

    p {
      margin-top: 20px;
    }
  }
}
</style>