import { uuid } from '@/utils/index';
<!--
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:37:42
 * @LastEditTime: 2020-12-01 23:26:37
 * @FillPath: Do not edit
-->
<template>
  <div class="myCenter">
    <div class="left">
      <div class="l-header">
        <img class="avatar" :src="userInfo.avatar" alt="">
        <p class="nickname">{{userInfo.nickname}}</p>
        <p class="position">{{userInfo.position}}</p>
      </div>
      <ul class="function">
        <li>
          <div class="fun-title">
            需求
            <p class="fun-title-en">DEMAND</p>
          </div>
          <div class="fun-number">12</div>
        </li>
        <li>
          <div class="fun-title">
            资源
            <p class="fun-title-en">RESOURCES</p>
          </div>
          <div class="fun-number">1</div>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="r-menu">
        <el-tabs v-model="activeName" @tab-click="handleTabsClick">
          <el-tab-pane label="全部" name="first">全部</el-tab-pane>
          <el-tab-pane label="待审核" name="second">待审核</el-tab-pane>
          <el-tab-pane label="进行中" name="third">进行中</el-tab-pane>
          <el-tab-pane label="已完成" name="fourth">已完成</el-tab-pane>
        </el-tabs>
        <button class="create-requirement">+ 创建需求</button>
      </div>
      <div class="r-content">
        <ul>
          <li>
            <div class="r-content-header">
              <p class="title">招商银行长期优势专享B期</p>
              <div class="r-content-mark">
                <span>产业基金</span>
                <span>流量入口</span>
              </div>
              <button class="r-content-btn">已提交</button>
            </div>
            <div class="r-content-des">
              <p>
                项目简介投资早期创业，寻找不确定中的确定遵循商业本质，投资变革之中的不变有位客人到某人家里做客，看见主人家的灶上烟囱是直的，旁边又有很多木材。客人告诉主人说，烟囱要改曲，木材须移去，否则将来可能会有火灾，主人听了没有作任何表示。...
              </p>
            </div>
            <div class="r-content-time">发布时间：11-11</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getRequirementListMoudle,
    getResourceListMoudle
  } from '@/api/myCenter';
  import {
    uuid
  } from "@/utils/index";
  export default {
    data() {
      return {
        userInfo: {},
        activeIndex: '1',
        requirementList: {},
        requirementLength: 0,
        resourcesLength: 0,
        activeName:
      }
    },
    created() {
      this.userInfo = JSON.parse(JSON.parse(window.localStorage.getItem('userInfo')));
      this.getRequirementList('1,2,3,4', 1, 1);
      this.getResourceList('1,2', 1, 1);
    },
    methods: {
      handleSelect() {

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
            meets,
            size,
            message
          } = res.data;
          if (!status) {
            this.requirementList = meets;
            this.requirementLength = size;
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
            meets,
            size,
            message
          } = res.data;
          if (!status) {
            this.resourcesLength = meets;
          } else {
            this.$message.error(message);
          }
        })
      },
      handleTabsClick(tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .myCenter {
    position: relative;
    width: 100%;
    height: 100vh;

    .left {
      width: 300px;
      height: 100vh;
      background: #eee;
      float: left;

      .l-header {
        text-align: center;

        .avatar {
          margin-top: 70px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        .nickname {
          font-size: 20px;
          color: #000;
          font-weight: bold;
          margin-top: 20px;
        }

        .position {
          font-size: 13px;
          color: #888888;
        }
      }

      .function {
        width: 150px;
        margin: 0 auto;
        margin-top: 70px;


        li {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          border-left: 2px solid #ccc;
          padding-left: 20px;
        }

        .fun-title {
          font-size: 16px;
          color: #000;
        }

        .fun-title-en {
          font-size: 13px;
          color: #aaa;
        }

        .fun-number {
          display: inline-block;
          width: 30px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #ccc;
          border-radius: 50%;
          text-align: center;
        }
      }


    }

    .right {
      margin-left: 300px;
      background: #fff;
      position: relative;
      padding: 30px;

      /deep/ .el-menu--horizontal>.el-menu-item {
        border-bottom: 1px solid #ECBE73;
      }

      .r-menu {
        position: relative;

        .create-requirement {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #F7941D;
          color: #fff;
          padding: 5px 10px;
          border: none;
          border-radius: 3px;
        }
      }

      .r-content {
        .r-content-header {
          .title {
            font-size: 18px;
            color: #000;
          }

          .r-content-mark {
            span {
              color: #F7941D;
              border: 1px solid #F7941D;
              border-radius: 40px;
              padding: 5px 10px;
            }
          }
        }
      }
    }
  }
</style>