<!--
 * @Author: wangtengteng
 * @Date: 2020-12-02 09:25:22
 * @LastEditTime: 2020-12-15 16:27:26
 * @FillPath: Do not edit
-->
<template>
  <div class="settings">
    <SettingHeader />
    <div class="content">
      <p class="tip" v-show="Number(userInfo.status) === 5">审核中</p>
      <el-tabs v-model="activeName">
        <el-tab-pane label="账号设置" name="1">
          <div class="info line">
            <p><span>昵称：</span>{{userInfo.nickname}}</p>
            <p><span>手机号：</span>{{userInfo.phone_num}}</p>
            <button class="editorNickname btn" @click="nicknameVisible = true;changeInfo.nickname = userInfo.nickname; nicknameExit=false;nicknameMaxLength=false;">编辑</button>
          </div>
          <div class="line">
            <p><span>账号身份：</span>{{userInfo.label ==='1' ? '资源提供方': userInfo.label==='2' ? '需求方' : '资源提供方；需求方'}}</p>
            <button class="btn" @click="labelVisible = true;">编辑</button>
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
    <el-dialog customClass="customDialog" title="选择头像" :visible.sync="dialogVisible">
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
    <el-dialog customClass="customDialog" title="修改昵称" :visible.sync="nicknameVisible">
      <el-input placeholder="请输入昵称" v-model="changeInfo.nickname" @input="nicknameChange" />
      <div class="nicknameExit">
        <span v-show="nicknameExit">昵称已存在</span>
        <span v-show="nicknameMaxLength">昵称不要超过十个字符</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="nicknameVisible = false">取 消</el-button>
        <el-button type="primary" @click="editNickname">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog customClass="customDialog" title="修改账号身份" :visible.sync="labelVisible" width="550px">
      <div class="choice">
        <el-checkbox-group v-model="checkList" @change="onLabelChange">
          <ul>
            <li class="left">
              <img src="../../assets/image/choice1.png" alt="">
              <p>我有好的项目，希望寻找意向资金</p>
              <el-checkbox label="1">资源方</el-checkbox>
            </li>
            <li class="right">
              <img src="../../assets/image/choice2.png" alt="">
              <p>我有充足的资金，希望寻找好的项目</p>
              <el-checkbox label="2">需求方</el-checkbox>
            </li>
          </ul>
          <div class="box"></div>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="labelVisible = false">取 消</el-button>
        <el-button type="primary" @click="editeLabel">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog customClass="customDialog" title="修改行业类型" :visible.sync="industryVisible">
      <el-select v-model="changeInfo.industry" placeholder="请选择">
        <el-option v-for="item in industryOptions" :key="item" :value="item">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="industryVisible = false">取 消</el-button>
        <el-button type="primary" @click="editIndustry">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog customClass="customDialog" title="修改职位" :visible.sync="positionVisible">
      <el-select v-model="changeInfo.position" placeholder="请选择">
        <el-option v-for="item in positionOptions" :key="item" :value="item">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="positionVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPosition">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SettingHeader from '@/components/common/settingHeader'
import {
  getAvatarListMoudle,
  updateUserInfoMoudle,
  getIndustryListMoudle,
  getPositionListMoudle,
  getIsLogin,
  checkNnickNameExistMoudle
} from '@/api/login';
import {
  uuid,
  setCookie,
  throttle
} from "@/utils/index";
const AVATARURL = 'https://cuohe-1304244764.cos.ap-beijing.myqcloud.com/';
export default {
  components: {
    SettingHeader
  },
  data () {
    return {
      changeInfo: {},
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
      labelVisible: false,
      industryOptions: [],
      positionOptions: [],
      checkList: [],
      nicknameExit: false,
      nicknameMaxLength: false
    }
  },
  created () {
    this.getUserInfo();
    this.getAvatarList();
    this.getIndustryList();
    this.getPositionList();
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
        } else {
          this.$message.error(message);
        }
      })
    },
    getIndustryList () {
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
    getPositionList () {
      getPositionListMoudle({
        reqid: uuid()
      }).then(res => {
        const {
          status,
          message,
          data
        } = res.data;
        if (!status) {
          this.positionOptions = data;
        } else {
          this.$message.error(message);
        }
      })
    },
    selectAvatar () {
      this.dialogVisible = true;
    },
    getAvatarList () {
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
    chooseAvatar (index) {
      this.selectedAvatarIndex = index;
    },
    onConfirm () {
      this.selectedAvatar = this.avatarList[this.selectedAvatarIndex];
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
          this.userInfo.avatar = this.selectedAvatar;
          this.dialogVisible = false;
          // setCookie('userInfo', JSON.stringify(this.userInfo));
          this.$auth.removeUserInfo();
          this.$store.commit('auth/getUserInfo', JSON.stringify(this.userInfo))
          this.$store.commit('auth/getAvatar', this.selectedAvatar)
          setCookie('userInfo', JSON.stringify(this.userInfo));
          this.$message.success('修改成功');
        } else {
          this.$message.error(message);
        }
      })
    },
    // 修改账户身份
    onLabelChange (val) {
      this.checkList = val;
    },
    checkNnickNameExist (nick_name) {
      throttle(
        checkNnickNameExistMoudle({
          reqid: uuid(),
          nick_name
        }).then(res => {
          const {
            status,
            message,
            exist
          } = res.data;
          if (!status) {
            this.nicknameExit = exist;
          } else {
            this.$message.error(message);
          }
        }), 2000)
    },
    nicknameChange (val) {
      if (!val) return;
      this.checkNnickNameExist(val)
      if (val.length > 10) {
        this.nicknameMaxLength = true;
      } else {
        this.nicknameMaxLength = false;
      }
    },
    editNickname () {
      console.log(this.nicknameMaxLength)
      this.checkNnickNameExist(this.changeInfo.nickname);
      if (this.nicknameExit || this.nicknameMaxLength) return;
      updateUserInfoMoudle({
        reqid: uuid(),
        user_id: this.userInfo.id,
        avatar: this.userInfo.avatar,
        industry: this.userInfo.industry,
        position: this.userInfo.position,
        label: this.userInfo.label,
        nickname: this.changeInfo.nickname
      }).then(res => {
        const {
          status,
          message,
          data
        } = res.data;
        if (!status) {
          this.nicknameVisible = false;
          this.userInfo.nickname = this.changeInfo.nickname;
          setCookie('userInfo', JSON.stringify(this.userInfo));
          this.$alert(
            `您的昵称修改申请已经提交，请您耐心等待审核。审核期间，不可以创建资源和需求，可以浏览已创建资源和需求。`,
            '已提交申请', {
            confirmButtonText: '确定',
          }).then(() => {
            location.reload();
          });
        } else {
          this.$message.error(message);
        }
      })
    },
    editIndustry () {
      updateUserInfoMoudle({
        reqid: uuid(),
        user_id: this.userInfo.id,
        avatar: this.userInfo.avatar,
        industry: this.changeInfo.industry,
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
          this.industryVisible = false;
          setCookie('userInfo', JSON.stringify(this.userInfo));
          this.userInfo.industry = this.changeInfo.industry;
          this.userInfo = JSON.parse(JSON.parse(window.localStorage.getItem('userInfo')));
          this.$alert(
            `您的行业类型修改申请已经提交，请您耐心等待审核。审核期间，不可以创建资源和需求，可以浏览已创建资源和需求。`,
            '已提交申请', {
            confirmButtonText: '确定'
          });
        } else {
          this.$message.error(message);
        }
      })
    },
    editPosition () {
      updateUserInfoMoudle({
        reqid: uuid(),
        user_id: this.userInfo.id,
        avatar: this.userInfo.avatar,
        industry: this.userInfo.industry,
        position: this.changeInfo.position,
        label: this.userInfo.label,
        nickname: this.userInfo.nickname
      }).then(res => {
        const {
          status,
          message,
          data
        } = res.data;
        if (!status) {
          this.positionVisible = false;
          this.userInfo.position = this.changeInfo.position;
          setCookie('userInfo', JSON.stringify(this.userInfo));
          this.$alert(
            `您的职位修改申请已经提交，请您耐心等待审核。审核期间，不可以创建资源和需求，可以浏览已创建资源和需求。`,
            '已提交申请', {
            confirmButtonText: '确定'
          });
        } else {
          this.$message.error(message);
        }
      })
    },
    editeLabel () {
      let label = '';
      if (this.checkList.length === 2) {
        label = '1,2';
      } else if (this.checkList.length === 1) {
        label = this.checkList[0];
      } else {
        this.$message.warning('请选择账户身份');
        return;
      }
      updateUserInfoMoudle({
        reqid: uuid(),
        user_id: this.userInfo.id,
        avatar: this.userInfo.avatar,
        industry: this.userInfo.industry,
        position: this.changeInfo.position,
        label,
        nickname: this.userInfo.nickname
      }).then(res => {
        const {
          status,
          message,
          data
        } = res.data;
        if (!status) {
          this.labelVisible = false;
          this.userInfo.label = label;
          setCookie('userInfo', JSON.stringify(this.userInfo));
          this.$alert(
            `您的账户身份修改申请已经提交，请您耐心等待审核。审核期间，不可以创建资源和需求，可以浏览已创建资源和需求。`,
            '已提交申请', {
            confirmButtonText: '确定'
          });
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

  .content {
    position: relative;
    width: 60%;
    margin: 0 auto;
    font-size: 14px;
    padding-bottom: 40px;
    color: #4c4c4c;
    .tip {
      position: absolute;
      top: 29px;
      right: 34px;
      color: #c99540;
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
        background: #c99540;
        color: #fff;
        padding: 5px 20px;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }

    .line {
      border-bottom: 1px solid #d2d2d2;
      padding: 10px;
    }

    .avatar {
      cursor: pointer;

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

  .choice {
    width: 480px;
    height: 256px;
    background: #f5f5f5;
    border: 2px solid #eeeeee;
    border-radius: 5px;
    margin-top: 20px;
    position: relative;

    li {
      width: 50%;
      float: left;
      text-align: center;
      margin: 0 auto;
      padding-top: 46px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      p {
        color: #000;
        margin: 20px 0;
        font-weight: 400;
        color: #4c4c4c;
      }
    }

    /deep/.el-checkbox-group {
      font-size: 14px;
    }

    .box {
      position: absolute;
      width: 2px;
      height: 180px;
      background: #ccc;
      top: 32px;
      left: 50%;
    }
  }

  .nicknameExit {
    height: 30px;
    color: red;
    padding-top: 10px;

    span {
      display: inline-block;
    }
  }
}
</style>