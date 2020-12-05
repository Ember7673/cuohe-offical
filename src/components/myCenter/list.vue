<!--
 * @Author: wangtengteng
 * @Date: 2020-12-02 19:34:53
 * @LastEditTime: 2020-12-06 00:15:20
 * @FillPath: Do not edit
-->
<template>
  <div class="content">
    <div v-show="list.length">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="clickList(index)">
          <div class="r-content-header">
            <p class="title">{{item.name}}</p>
            <button class="r-content-btn" :class="'status' + item.status">{{item.statusBtn}}</button>
          </div>
          <div class="r-content-des">
            <p style="white-space: pre-wrap;">
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
    <el-dialog customClass="details" :title="isEdit ?'' : ''" :visible.sync="curItemVisible" @closed="onClose">
      <div class="">
        <span class="action editor" @click="onEdit">编辑</span>
        <span class="action delete" @click="onDeleteRequirment">删除</span>
        <!-- <p class="status">
          <span>状态：{{curItem.status}}</span>
          <span>创建时间：{{curItem.create_time}}</span>
          <span>创建者：{{curItem.status}}</span>
        </p> -->
        <Steps :step="curItem.status" :type="'requirement'"></Steps>
        <div class="detailContent" v-show="!isEdit">
          <div class="text description">
            <p class="title">需求介绍：</p>
            <p class="descriptionContent" style="white-space: pre-wrap;">{{curItem.description}}</p>
          </div>
          <div class="text">
            <p class="title">合作方式：</p>
            <span>{{curItem.cooperation_method}}</span>
          </div>
          <div class="text">
            <p class="title">附件：</p>
            <div class="filesList">
              <p v-show="filesList.length" v-for="(file, fileIndex) in filesList" :key="fileIndex">
                <span>{{file.name}}</span>
                <button class="downloadBtn" @click="onDownload(fileIndex)">下载</button>
              </p>
              <p v-show="!filesList.length">暂无附件</p>
            </div>

          </div>
        </div>

        <div class="detailContent" v-show="isEdit">
          <div class="text description">
            <p class="title">需求介绍：</p>
            <el-input type="textarea" :rows="7" placeholder="请详细描述需求" class="descriptionInput"
              v-model="changeItem.description"></el-input>
          </div>
          <div class="text coo">
            <p class="title">合作方式：</p>
            <el-select popper-class="cooSelect" v-model="changeItem.cooperation_method" placeholder="请选择">
              <el-option value="线上"></el-option>
              <el-option value="线下"></el-option>
            </el-select>
          </div>
          <div class="text">
            <p class="title">附件：</p>
            <div class="filesList">
              <p v-show="filesList.length" v-for="(file, fileIndex) in filesList" :key="fileIndex">
                <span>{{file.name}}</span>
                <button class="downloadBtn" @click="onDownload(fileIndex)">下载</button>
                <button class="downloadBtn" @click="onDeleteFile(file, fileIndex)">删除</button>
              </p>
              <p v-show="!filesList.length">暂无附件</p>
            </div>

          </div>
        </div>

      </div>
      <span slot="footer" class="dialog-footer" v-show="isEdit">
        <el-button @click="curItemVisible = false; isEdit = false;">取 消</el-button>
        <el-button type="primary" @click="onEditSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    updateRequirementMoudle,
    deleteRequirementMoudle
  } from '@/api/myCenter';
  import Steps from '@/components/myCenter/detailSteps';
  import {
    uuid,
    getCookie
  } from '@/utils/index';
  export default {
    components: {
      Steps
    },
    props: ['list', 'size', 'pageindex'],
    data() {
      return {
        curItem: {},
        curItemVisible: false,
        filesList: [],
        isEdit: false,
        changeItem: {}
      }
    },
    methods: {
      currentChange(index) {
        this.$emit('pageChange', index);
      },
      clickList(index) {
        this.filesList = [];
        this.curItem = this.list[index];
        this.curItemVisible = true;

        switch (this.curItem.status) {
          case '1':
            this.curItem.statusText = '已创建';
            break;
          case '2':
            this.curItem.statusText = '已审核';
            break;
          case '3':
            this.curItem.statusText = '已对接';
            break;
          case '4':
            this.curItem.statusText = '已完成';
            break;
        }
        this.filesList.push(...this.curItem.pic_annex,
          ...this.curItem.video_annex,
          ...this.curItem.file_annex)
        this.changeItem = JSON.parse(JSON.stringify(this.curItem));
      },
      onDownload(index) {
        const AVATARURL = 'https://cuohe-1304244764.cos.ap-beijing.myqcloud.com/';
        let url = AVATARURL + this.filesList[index].download_name;
        window.location.href = url;
      },
      // 删除文件
      onDeleteFile(file, index) {
        let me = this;
        me.$alert(`确定删除 ${ file.name }？`, {
          confirmButtonText: '确定',
          callback: action => {
            console.log('v', me.filesList)
            me.filesList.splice(index, 1);
            me.curItem.pic_annex.splice(index, 1);
          }
        });
      },
      onDeleteRequirment() {
        deleteRequirementMoudle({
          reqid: uuid(),
          id: this.curItem.id,
          user_id: this.curItem.user_id
        }).then(res => {
          const {
            status,
            message
          } = res.data;
          if (!status) {
            this.$message.success('删除成功');
            this.curItemVisible = false;
            this.$emit('refreshList')
          } else {
            this.$message.error(message);
          }
        })
      },
      onEdit() {
        this.isEdit = true;
      },
      onClose() {
        this.isEdit = false;
      },
      onEditSubmit() {
        this.curItem.description = this.changeItem.description;
        this.curItem.cooperation_method = this.changeItem.cooperation_method;
        updateRequirementMoudle({
          reqid: uuid(),
          ...this.curItem
        }).then(res => {
          const {
            status,
            message
          } = res.data;
          if (!status) {
            this.$message.success('编辑成功');
            this.curItemVisible = false;
          } else {
            this.$message.error(message);
          }
        })
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
        background: #dad7d7;
        color: #fff;
        border: none;
        border-radius: 3px;
      }

      .status1 {
        background: #dad7d7;
      }

      .status2 {
        background: #F7941D;
      }

      .status3 {
        background: #1d84f7;
      }

      .status4 {
        background: #1ac76b;
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

    .details {
      position: relative;

      /deep/ .el-dialog__header {
        padding: 20px 20px 40px;
      }

      .action {
        position: absolute;
        top: 20px;
        cursor: pointer;
        color: #ECBE73;
      }

      .editor {
        right: 110px;
      }

      .delete {
        right: 60px;
      }

      .detailContent {
        margin-top: 50px;
      }

      .text {
        margin: 20px 0;

        /deep/ .el-textarea__inner:focus {
          border-color: #ECBE73;
        }

        /deep/ .el-input.is-active .el-input__inner,
        .el-input__inner:focus {
          border-color: #ECBE73;
        }

        .title {
          display: inline-block;
          width: 80px;
          font-size: 16px;
          font-weight: bold;
          color: #4C4C4C;
          margin: 10px 0;
          text-align: right;
        }

        .descriptionContent {
          margin-left: 105px;
        }

        span {
          margin-left: 25px;
        }

        .filesList {
          display: block;
          margin-left: 105px;
          margin-top: -43px;

          p {
            margin-top: 10px;
          }

          .downloadBtn {
            font-size: 12px;
            margin-left: 20px;
            border: 1px solid #BFBFBF;
            box-shadow: 0px 1px 9px 0px rgba(1, 1, 1, 0.15);
            border-radius: 5px;
            padding: 3px 5px;
          }
        }

        /deep/ .el-input__inner {
          width: 400px;
        }
      }

      .coo {
        /deep/ .el-select .el-input.is-focus .el-input__inner {
          border-color: #ECBE73;
        }

        /deep/ .el-select .el-input__inner:focus {
          border-color: #ECBE73;
        }
      }

      .dialog-footer {
        /deep/ .el-button--primary {
          background: #ECBE73;
          border-color: #ECBE73;
        }

        /deep/ .el-button:focus,
        .el-button:hover {
          color: #fff;
          border-color: #f7ead4;
          background-color: #f7ead4;
        }
      }


    }


  }
</style>