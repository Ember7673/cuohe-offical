<!--
 * @Author: wangtengteng
 * @Date: 2020-12-10 15:58:07
 * @LastEditTime: 2020-12-15 16:20:46
 * @FilePath: \cuohe-offical\src\components\common\settingHeader.vue
-->
<template>
  <div class="header">
    <div class="top">
      <img class="avatar" :src="userInfo.avatar" alt="">
      <div class="info">
        <p class="nickname">{{userInfo.nickname}}</p>
        <p class="position">{{userInfo.position}}</p>
      </div>
    </div>
    <div>
      <div class="number requireNumber">发布<span>{{requirementLength}}</span>次需求</div>
      <div class="number resourceNumber">提供<span>{{resourcesLength}}</span>次资源</div>
    </div>

  </div>
</template>

<script>
import {
  getRequirementListMoudle,
  getResourceListMoudle
} from '@/api/myCenter';
import { getIsLogin } from '@/api/login'
import {
  uuid,
} from "@/utils/index";
export default {
  data () {
    return {
      requirementLength: 0,
      resourcesLength: 0,
      userInfo: {}
    }
  },
  mounted () {
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
          this.changeInfo = JSON.parse(JSON.stringify(this.userInfo));
          this.getRequirementList('1,2,3,4', 1, 10);
          this.getResourceList('1,2', 1, 10);
        } else {
          this.$message.error(message);
        }
      })
    },
    getRequirementList (status, pageindex, pagesize) {
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
.header {
  width: 100%;
  height: 250px;
  background-image: url("../../assets/image/settingsBg.jpg");
  background-size: cover;
  text-align: center;
  position: relative;
  color: #fff;
  padding-top: 50px;

  .top {
    margin: 0 auto;
    position: relative;
    // width: 240px;
    display: inline-block;
    height: 80px;
    background: rgba($color: #000000, $alpha: 0.5);
    border-radius: 40px;
  }

  .avatar {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }

  .info {
    display: inline-block;
    margin: 0 20px;
    margin-top: 20px;
    vertical-align: top;

    .nickname {
      font-size: 20px;
      font-weight: bold;
      text-align: left;
    }
    .position {
    }
  }

  .number {
    display: inline-block;
    font-size: 14px;
    margin: 30px 0 0 0;

    span {
      font-size: 19px;
      font-weight: 500;
    }
  }
  .resourceNumber {
    padding-left: 60px;
  }
}
</style>