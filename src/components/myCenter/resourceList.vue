<!--
 * @Author: wangtengteng
 * @Date: 2020-12-02 19:34:53
 * @LastEditTime: 2020-12-10 09:32:29
 * @FillPath: Do not edit
-->
<template>
  <div class="content">
    <div v-show="list.length">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="clickList(index)">
          <div class="r-content-header">
            <p class="title">{{item.name}}</p>
            <!-- <button class="r-content-btn">{{item.statusBtn}}</button> -->
          </div>
          <div class="r-content-des">
            <p class="descriptionContent" style="white-space: pre-wrap;">
              {{item.description}}
            </p>
          </div>
          <div class="r-content-time">发布时间：{{item.create_time}}</div>
          <div class="r-content-status">
            <img v-show="Number(item.status) === 1" src="../../assets/image/status/1.jpg" alt="">
            <img v-show="Number(item.status) === 2" src="../../assets/image/status/2.jpg" alt="">
            <img v-show="Number(item.status) === 3" src="../../assets/image/status/3.jpg" alt="">
            <img v-show="Number(item.status) === 4" src="../../assets/image/status/4.jpg" alt="">
            <p class="statusText">{{item.statusBtn}}</p>
            <p class="statusSubText">{{item.statusSubText}}</p>
          </div>
        </li>
      </ul>
      <el-pagination :current-page="pageindex" background layout="prev, pager, next" :page-size="10" :total="size" @current-change="currentChange">
      </el-pagination>
    </div>
    <div v-show="!list.length" class="empty">
      <img src="../../assets/image/empty.png" alt="">
    </div>
    <el-dialog customClass="details customDialog" :title="curItem.name" :visible.sync="curItemVisible" @closed="onClose">
      <div class="">
        <span v-show="userInfo && Number(userInfo.status) === 6" class="action editor" @click="onEdit">编辑</span>
        <span v-show="userInfo && Number(userInfo.status) === 6" class="action delete" @click="onDeleteRequirment">删除</span>
        <!-- <p class="status">
          <span>状态：{{curItem.status}}</span>
          <span>创建时间：{{curItem.create_time}}</span>
          <span>创建者：{{curItem.status}}</span>
        </p> -->
        <Steps :step="curItem.status" :type="'resource'"></Steps>
        <div class="detailContent" v-show="!isEdit">
          <div class="text description">
            <p class="title">需求介绍：</p>
            <p class="descriptionContent descriptionContentEditor" style="white-space: pre-wrap;">
              {{curItem.description}}</p>
          </div>
          <div class="text">
            <p class="title">合作方式：</p>
            <span class="cooperationMethod">{{curItem.resource_type}}</span>
          </div>
          <div class="text">
            <p class="title">合作领域：</p>
            <span class="cooperationArea">{{curItem.area}}</span>
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
            <p class="title">资源名称：</p>
            <el-input type="text" placeholder="请输入资源名称" class="descriptionInput" v-model="changeItem.name"></el-input>
          </div>
          <div class="text description">
            <p class="title">资源介绍：</p>
            <el-input type="textarea" :rows="7" placeholder="请详细描述资源" class="descriptionInput" v-model="changeItem.description"></el-input>
          </div>
          <div class="text coo">
            <p class="title">合作方式：</p>
            <el-select v-model="changeItem.resource_type" placeholder="请选择合作方式">
              <el-option value="现金"></el-option>
            </el-select>
          </div>
          <div class="text area">
            <p class="title">合作领域：</p>
            <el-input type="text" placeholder="请输入合作领域" v-model="changeItem.area"></el-input>
          </div>
          <div class="text">
            <p class="title">附件：</p>
            <label for="uploadFile" class="uploadFileLabel">
              <button class="uploadFileBtn">点击上传</button>
              <input ref="referenceUpload" id="uploadFile" type="file" multiple="multiple" @change.self="onUploadFile" />
            </label>
            <div class="filesList editorFileList">
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
  updateResourceMoudle,
  deleteResourceMoudle,
  getCosToken
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
  props: ['list', 'size', 'pageindex', 'userInfo'],
  data () {
    return {
      curItem: {},
      curItemVisible: false,
      filesList: [],
      isEdit: false,
      changeItem: {}
    }
  },
  methods: {
    currentChange (index) {
      this.$emit('pageChange', index);
    },
    clickList (index) {
      this.filesList = [];
      this.curItem = this.list[index];
      this.curItemVisible = true;
      this.filesList.push(...this.curItem.pic_annex,
        ...this.curItem.video_annex,
        ...this.curItem.file_annex)
      this.changeItem = JSON.parse(JSON.stringify(this.curItem));
    },
    onDownload (index) {
      const AVATARURL = 'https://cuohe-1304244764.cos.ap-beijing.myqcloud.com/';
      let url = AVATARURL + this.filesList[index].download_name;
      window.location.href = url;
    },
    // 删除文件
    onDeleteFile (file, index) {
      let me = this;
      me.$alert(`确定删除 ${file.name}？`, {
        confirmButtonText: '确定',
        callback: action => {
          console.log('v', me.filesList)
          me.filesList.splice(index, 1);
          me.curItem.pic_annex.splice(index, 1);
        }
      });
    },
    onDeleteRequirment () {
      deleteResourceMoudle({
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
    onEdit () {
      this.isEdit = true;
    },
    onClose () {
      this.isEdit = false;
    },
    //  上传附件
    onUploadFile (event) {
      this.$refs.referenceUpload.click();
      const files = event.target.files;
      files.forEach(file => {
        this.uploadFileFn(file)
      })
    },
    getType (file) {
      var filename = file;
      var index1 = filename.lastIndexOf(".");
      var index2 = filename.length;
      var type = filename.substring(index1, index2);
      return type;
    },
    uploadFileFn (files) {
      const reqid = uuid();
      const suffix = this.getType(files.name);
      let file_name = reqid + suffix;
      getCosToken({
        reqid,
        method: 1,
        file_name
      }).then(res => {
        const {
          url,
          token
        } = res.data.detail;
        this.$axios.put(url,
          files, {
          headers: {
            'Authorization': token,
          }
        }
        ).then(() => {
          this.$message.success('文件上传成功');
        }).catch(e => {
          this.$message.error(e)
        })
      })
      this.curItem.pic_annex.push({
        name: files.name,
        download_name: file_name
      })
      this.filesList.push({
        name: files.name,
        download_name: file_name
      })
    },
    onEditSubmit () {
      this.curItem.description = this.changeItem.description;
      this.curItem.resource_type = this.changeItem.resource_type;
      this.curItem.name = this.changeItem.name;
      this.curItem.area = this.changeItem.area;
      let option = JSON.parse(JSON.stringify(this.curItem));
      delete option.create_time;
      delete option.review_time;
      updateResourceMoudle({
        reqid: uuid(),
        ...option
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
    height: 135px;
    border: 1px solid #ddd;
    padding: 20px;
    position: relative;
    margin-bottom: 20px;

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
      width: 283px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .r-content-mark {
      margin-bottom: 20px;

      span {
        color: #f7941d;
        border: 1px solid #f7941d;
        border-radius: 40px;
        padding: 5px 10px;
        margin-right: 20px;
      }
    }
  }

  .r-content-status {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 57px;
    img {
      height: 135px;
    }
    .statusSubText {
      width: 57px;
      text-align: center;
      position: absolute;
      bottom: 40px;
      font-size: 18px;
      font-weight: 400;
      color: #000000;
      font-weight: bold;
    }
    .statusText {
      width: 57px;
      position: absolute;
      bottom: 20px;
      font-size: 12px;
      color: #000000;
      text-align: center;
    }
  }

  .r-content-des {
    width: 100%;

    .descriptionContent {
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;
    }

    p {
      width: 70%;
    }
  }

  .r-content-time {
    font-size: 12px;
    font-weight: 400;
    color: #4c4c4c;
    position: absolute;
    bottom: 15px;
    right: 65px;
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
    background-color: #f7941d;
  }

  /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #606266;
  }

  .details {
    position: relative;

    /deep/ .el-dialog__header {
      padding: 20px 20px 20px;
      background: #000;
    }

    /deep/ .el-dialog__title {
      color: #fff;
    }

    .action {
      position: absolute;
      top: 20px;
      cursor: pointer;
      color: #ecbe73;
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

      .cooperationMethod,
      .cooperationArea {
        margin-left: 25px;
      }

      /deep/ .el-textarea__inner:focus {
        border-color: #ecbe73;
      }

      .title {
        display: inline-block;
        width: 80px;
        font-size: 16px;
        font-weight: bold;
        color: #4c4c4c;
        margin: 10px 0;
        text-align: right;
      }

      .descriptionContentEditor {
        margin-left: 105px;
        border: 1px solid #bfbfbf;
        height: 100px;
        overflow: hidden;
        overflow-y: scroll;
      }

      .uploadFileLabel {
        position: relative;

        #uploadFile {
          width: 100px;
          height: 26px;
          position: absolute;
          top: 0px;
          left: 0;
          opacity: 0;
        }

        .uploadFileBtn {
          width: 100px;
          height: 26px;
          color: #fff;
          background: #f7941d;
          border: none;
          position: absolute;
          top: 0px;
          left: 0;
        }
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
          border: 1px solid #bfbfbf;
          box-shadow: 0px 1px 9px 0px rgba(1, 1, 1, 0.15);
          border-radius: 5px;
          padding: 3px 5px;
        }
      }

      .editorFileList {
        margin: 20px 0 0 80px;
      }

      /deep/ .el-input__inner {
        width: 400px;
      }
    }

    .coo {
      /deep/ .el-select .el-input.is-focus .el-input__inner {
        border-color: #ecbe73;
      }

      /deep/ .el-select .el-input__inner:focus {
        border-color: #ecbe73;
      }
    }

    .dialog-footer {
      /deep/ .el-button--primary {
        background: #ecbe73;
        border-color: #ecbe73;
      }

      /deep/ .el-button:focus,
      .el-button:hover {
        color: #ed9a14;
        border-color: #f7ead4;
        background-color: #f7ead4;
      }

      /deep/ .el-button--primary:focus,
      .el-button--primary:hover {
        color: #fff;
        border-color: #f1cb8c;
        background-color: #f1cb8c;
      }
    }

    .area {
      /deep/ .el-input {
        display: inline;
      }

      /deep/ .el-input.is-active .el-input__inner,
      .el-input__inner:focus {
        border-color: #ecbe73 !important;
      }
    }
  }
}
</style>