<!--
 * @Author: wangtengteng
 * @Date: 2020-11-23 23:35:40
 * @LastEditTime: 2020-11-24 00:26:27
 * @FillPath: Do not edit
-->
<template>
  <div class="choose">
    <div class="steps">
      <el-steps :space="200" :active="1" finish-status="success" align-center>
        <el-step title="身份验证"></el-step>
        <el-step title="选择账户"></el-step>
        <el-step title="完善信息"></el-step>
        <el-step title="注册完成"></el-step>
      </el-steps>
    </div>
    <div class="content">
      <p class="title">成为伙伴的目的是？</p>
      <p class="tip">请选择最能描述你的选项，可以多选。</p>
      <div class="choice">
        <el-checkbox-group v-model="checkList" @change="onChange">
          <ul>
            <li class="left">
              <img src="../../assets/image/choice1.png" alt="">
              <p>我有好的项目，希望寻找意向资金</p>
              <el-checkbox label="1">需求方</el-checkbox>
            </li>
            <li class="right">
              <img src="../../assets/image/choice2.png" alt="">
              <p>我有充足的资金，希望寻找好的项目</p>
              <el-checkbox label="2">资源方</el-checkbox>
            </li>
          </ul>
          <div class="box"></div>
        </el-checkbox-group>

      </div>
      <button class="nextBtn" @click="onNext">下一步</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkList: []
      }
    },
    methods: {
      onChange(val) {
        this.checkList = val;
      },
      onNext() {
        let label = '';
        if (this.checkList.length === 2) {
          label = '1,2';
        } else if (this.checkList.length === 1) {
          label = this.checkList[0];
        } else {
          this.$message.warning('请选择账户身份');
          return;
        }
        this.$router.push(`/personInfo?label=${label}`);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .choose {
    width: 100%;
    height: 100%;
    position: relative;
    background: #fff;

    .steps {
      width: 900px;
      position: absolute;
      top: 120px;
      left: 50%;
      transform: translateX(-50%);
      margin: 20px auto;

      /deep/ .el-step__title.is-success {
        color: #CF913F;
      }

      /deep/ .el-step__head.is-success {
        color: #CF913F;
        border-color: #CF913F;
      }
    }

    .content {
      width: 700px;
      position: absolute;
      top: 250px;
      left: 45%;
      transform: translateX(-50%);


      .title {
        font-size: 20px;
        color: #000;
        text-align: center;
      }

      .tip {
        font-size: 14px;
        color: #aaa;
        text-align: center;
        margin-top: 20px;
      }

      .choice {
        width: 700px;
        height: 256px;
        background: #F5F5F5;
        border: 2px solid #EEEEEE;
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
            color: #4C4C4C;
          }

          /deep/.el-checkbox-group {
            font-size: 14px;
          }
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

      .nextBtn {
        width: 200px;
        height: 45px;
        background: #CF913F;
        color: #fff;
        border: none;
        position: absolute;
        top: 400px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>