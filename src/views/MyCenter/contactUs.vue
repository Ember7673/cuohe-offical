<!--
 * @Author: wangtengteng
 * @Date: 2020-12-03 19:27:18
 * @LastEditTime: 2020-12-08 14:19:45
 * @FillPath: Do not edit
-->
<template>
  <div class="contactUs">
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
import {
  getRequirementListMoudle,
  getResourceListMoudle
} from '@/api/myCenter';
import {
  customerServicePhoneNumMoudle,
  getIsLogin
} from '@/api/login';
import {
  uuid
} from '@/utils/index';
export default {
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
          this.getRequirementList('1,2,3,4', 1, 10);
          this.getResourceList('1,2', 1, 10);
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
    getRequirementList (status, pageindex, pagesize) {
      console.log(this.userInfo.id)
      getRequirementListMoudle({
        reqid: uuid(),
        status,
        user_id: this.userInfo.id,
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
    getResourceList (status, pageindex, pagesize) {
      getResourceListMoudle({
        reqid: uuid(),
        status,
        user_id: this.userInfo.id,
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
  }
}
</script>

<style lang="scss" scoped>
.contactUs {
  height: 100vh;
  background: #fff;

  .header {
    width: 100%;
    height: 250px;
    background-image: url("../../assets/image/settingsBg.jpg");
    background-size: cover;
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