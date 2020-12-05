import { uuid } from '@/utils/index';
<!--
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:37:42
 * @LastEditTime: 2020-12-05 19:02:36
 * @FillPath: Do not edit
-->
<template>
  <div class="myCenter" v-loading="loading">
    <div class="left">
      <div class="l-header">
        <img class="avatar" :src="userInfo.avatar" alt="">
        <p class="nickname">{{userInfo.nickname}}</p>
        <p class="position">{{userInfo.position}}</p>
      </div>
      <ul class="function">
        <li @click="toRequirement">
          <div class="fun-title">
            需求
            <p class="fun-title-en">DEMAND</p>
          </div>
          <div class="fun-number">{{requirementLength}}</div>
        </li>
        <li @click="toResource">
          <div class="fun-title">
            资源
            <p class="fun-title-en">RESOURCES</p>
          </div>
          <div class="fun-number requirement">{{resourcesLength}}</div>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="r-menu">
        <el-tabs v-model="activeName" @tab-click="handleTabsClick">
          <el-tab-pane label="全部" name="1,2">
            <listMoudle :list="resourcesList" :size="resourcesLength" @pageChange="pageChange"
              @refreshList="refreshList"></listMoudle>
          </el-tab-pane>
          <el-tab-pane label="已提交" name="1">
            <listMoudle :list="resourcesList" :size="resourcesLength" @pageChange="pageChange"
              @refreshList="refreshList"></listMoudle>
          </el-tab-pane>
          <el-tab-pane label="已审核" name="2" :size="resourcesLength" @pageChange="pageChange" @refreshList="refreshList">
            <listMoudle :list="resourcesList"></listMoudle>
          </el-tab-pane>
        </el-tabs>
        <button class="create-requirement" @click="clickCreateRequirement">+ 创建资源</button>
      </div>

      <el-dialog title="创建资源" :visible.sync="createRequirementVisible" width="800px">
        <div>
          <el-form :model="createResourceForm" :rules="rules" ref="createResourceForm" label-width="100px"
            class="demo-ruleForm">
            <el-form-item prop="name" label="资源名称">
              <el-input placeholder="请输入资源名称" v-model="createResourceForm.name">
              </el-input>
            </el-form-item>
            <el-form-item prop="description" label="资源介绍">
              <el-input type="textarea" :rows="7" placeholder="请详细描述资源" v-model="createResourceForm.description">
              </el-input>
            </el-form-item>
            <el-form-item label="合作方式" prop="resource_type">
              <el-select v-model="createResourceForm.resource_type" placeholder="请选择合作方式">
                <el-option value="现金"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合作领域" prop="area">
              <el-input placeholder="请输入合作领域" v-model="createResourceForm.area" />
            </el-form-item>
            <el-form-item label="附件">
              <input type="file" multiple="multiple" @change.self="onUploadFile" />
              <ul>
                <li v-for="(file, index) in filesList" :key="index">
                  <span>{{file.name}}</span>
                  <button @click="removeFile(file, index)">删除</button>
                </li>
              </ul>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <button class="createRequiremenBtn" @click="onCreateRequirement">创建</button>
        </span>
      </el-dialog>
      <el-dialog title="创建成功" :visible.sync="createSuccessVisible" width="500px" show-close>
        <div class="createSuccess">
          <img src="../../assets/image/resetPassword.png" alt="">
          <p>您的资源已经创建成功，我们会尽快审核，请您耐心等待！
            审核结果会以短信的形式通知，请您敬请期待</p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    getRequirementListMoudle,
    getResourceListMoudle,
    getCosToken,
    createResourceMoudle
  } from '@/api/myCenter';
  import {
    getIsLogin
  } from '@/api/login';
  import {
    uuid
  } from "@/utils/index";
  import listMoudle from '@/components/myCenter/resourceList';
  export default {
    components: {
      listMoudle
    },
    data() {
      return {
        userInfo: {},
        activeIndex: '1',
        resourcesList: [],
        requirementLength: 0,
        resourcesLength: 0,
        activeName: '1,2',
        createRequirementVisible: false,
        createResourceForm: {
          name: '',
          description: '',
          pic_annex: [],
          video_annex: [],
          file_annex: [],
          cooperation_method: ''
        },
        rules: {
          name: [{
            required: true,
            message: "请输入项目名称",
            trigger: "blur"
          }],
          description: [{
            required: true,
            message: "请输入项目描述",
            trigger: "blur"
          }],
          resource_type: [{
            required: true,
            message: "请选择合作方式",
            trigger: "blur"
          }],
          area: [{
            required: true,
            message: "请选择合作领域",
            trigger: "blur"
          }],
        },
        createSuccessVisible: false,
        pagestatus: '1', // 当前需求列表状态
        loading: true,
        filesList: [], //上传文件列表
        pageindex: 1,
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
            this.getRequirementList('1,2,3,4', 1, 10);
            this.getResourceList('1,2', 1, 10);
          } else {
            this.$message.error(message);
          }
        })
      },
      toRequirement() {
        this.$router.push('/mycenter');
      },
      toResource() {
        this.$router.push('/resource');
      },
      pageChange(pageindex) {
        this.getResourceList(this.pagestatus, pageindex)
      },
      refreshList() {
        this.getResourceList(this.pagestatus, this.pageindex)
      },
      getRequirementList(status, pageindex, pagesize = 10) {
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
            this.resourcesList = data.meets;
            this.resourcesList.forEach(item => {
              switch (item.status) {
                case 1:
                  item.statusBtn = '已提交';
                  break;
                case 2:
                  item.statusBtn = '已审核';
                  break;
              }
            })
            this.loading = false;
          } else {
            this.$message.error(message);
          }
        })
      },
      handleTabsClick(tab) {
        this.getResourceList(tab.name, 1, 10)
        this.pagestatus = tab.name;
      },
      // 点击创建需求
      clickCreateRequirement() {
        this.createRequirementVisible = true;
        this.createResourceForm = {
          name: '',
          description: '',
          pic_annex: [],
          video_annex: [],
          file_annex: [],
          resource_type: '',
          area: ''
        };
      },
      // 创建需求中删除附件
      removeFile(file, index) {
        let me = this;
        me.$alert(`确定删除 ${ file.name }？`, {
          confirmButtonText: '确定',
          callback: action => {
            console.log('v', me.filesList)
            me.filesList.splice(index, 1);
            me.createResourceForm.pic_annex.splice(index, 1);
          }
        });
      },
      //  上传附件
      async onUploadFile(event) {
        this.filesList = [];
        const files = event.target.files;
        files.forEach(file => {
          this.filesList.push(file)
          this.uploadFileFn(file)
        })
      },
      getType(file) {
        var filename = file;
        var index1 = filename.lastIndexOf(".");
        var index2 = filename.length;
        var type = filename.substring(index1, index2);
        return type;
      },
      async uploadFileFn(files) {
        const reqid = uuid();
        const suffix = this.getType(files.name);
        console.log('suffix', suffix)
        let file_name = reqid + suffix;
        await getCosToken({
          reqid,
          method: 1,
          file_name
        }).then(async res => {
          const {
            url,
            token
          } = res.data.detail;
          await this.$axios.put(url,
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
        this.createResourceForm.pic_annex.push({
          name: files.name,
          download_name: file_name
        })
      },
      onCreateRequirement() {
        createResourceMoudle({
          ...this.createResourceForm,
          user_id: this.userInfo.id,
          reqid: uuid()
        }).then(res => {
          const {
            status,
            message
          } = res.data;
          if (!status) {
            this.$message.success("创建资源成功");
            this.createRequirementVisible = false;
            this.createSuccessVisible = true;
            this.getResourceList(this.pagestatus, 1)
          } else {
            this.$message.error(message);
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .myCenter {
    position: relative;
    width: 100%;
    height: 100%;

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
          cursor: pointer;
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

        .requirement {
          border-color: #F7941D;
        }
      }


    }

    .right {
      margin-left: 300px;
      background: #fff;
      position: relative;
      padding: 30px;

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

      .r-menu {
        position: relative;

        .create-requirement {
          position: absolute;
          top: -3px;
          right: 20px;
          background: #F7941D;
          color: #fff;
          padding: 5px 10px;
          border: none;
          border-radius: 3px;
        }
      }

      .r-content {
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
      }
    }

    .createRequiremenBtn {
      width: 100px;
      height: 30px;
      line-height: 30px;
      background: #F7941D;
      color: #fff;
      border: none;
      border-radius: 3px;
      outline: none;
    }

    .createSuccess {
      margin: 0 auto;
      text-align: center;

      img {
        display: inline-block;
        width: 120px;
        height: 120px;
      }

      p {
        margin: 20px 0;
      }
    }
  }
</style>