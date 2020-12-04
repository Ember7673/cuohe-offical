<!--
 * @Author: wangtengteng
 * @Date: 2020-12-02 19:34:53
 * @LastEditTime: 2020-12-03 22:19:15
 * @FillPath: Do not edit
-->
<template>
  <div class="content">
    <div v-show="list.length">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="clickList(index)">
          <div class="r-content-header">
            <p class="title">{{item.name}}</p>
            <button class="r-content-btn">{{item.statusBtn}}</button>
          </div>
          <div class="r-content-des">
            <p>
              {{item.description}}
            </p>
          </div>
          <div class="r-content-time">发布时间：{{item.create_time}}</div>
        </li>
      </ul>
      <el-pagination :current-page="pageindex" background layout="prev, pager, next" :page-size="10" :total="size"
        @current-change="currentChange">
      </el-pagination>
    </div>



    <div v-show="!list.length" class="empty">
      <img src="../../assets/image/empty.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['list', 'size', 'pageindex'],
    methods: {
      currentChange(index) {
        this.$emit('pageChange', index);
      },
      clickList(index) {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    widows: 100%;
    position: relative;

    li {
      width: 90%;
      border: 1px solid #ddd;
      padding: 20px;
      position: relative;
      margin-bottom: 20px;
      // background: #fff;

      &:nth-of-type(odd) {
        background: #f5f5f5;
      }
    }

    .r-content-header {
      position: relative;

      .title {
        font-size: 18px;
        color: #000;
        margin-bottom: 20px;
        font-weight: 500;
      }

      .r-content-mark {
        margin-bottom: 20px;

        span {
          color: #F7941D;
          border: 1px solid #F7941D;
          border-radius: 40px;
          padding: 5px 10px;
          margin-right: 20px;
        }
      }

      .r-content-btn {
        position: absolute;
        right: 20px;
        top: 14px;
        width: 200px;
        height: 30px;
        line-height: 30px;
        background: #F7941D;
        color: #fff;
        border: none;
        border-radius: 3px;
      }
    }

    .r-content-des {
      width: 100%;

      p {
        width: 70%;
      }
    }

    .r-content-time {
      font-size: 12px;
      font-weight: 400;
      color: #4C4C4C;
      position: absolute;
      bottom: 15px;
      right: 15px;
    }

    .empty {
      margin: 200px auto;
      text-align: center;

      img {
        width: 280px;
        height: 280px;
      }
    }

    /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #F7941D;
    }

    /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
      color: #606266;
    }
  }
</style>