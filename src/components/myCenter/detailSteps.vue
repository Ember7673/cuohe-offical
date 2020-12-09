<!--
 * @Author: wangtengteng
 * @Date: 2020-12-05 10:12:53
 * @LastEditTime: 2020-12-09 17:06:13
 * @FillPath: Do not edit
-->
<template>
  <div class="steps">
    <el-steps v-show="type === 'requirement'" :space="200" :active="step" finish-status="success" align-center>
      <el-step title="待审核"></el-step>
      <el-step title="已审核"></el-step>
      <el-step title="已对接"></el-step>
      <el-step title="已完成"></el-step>
    </el-steps>
    <el-steps v-show="type === 'resource'" :space="200" :active="step" finish-status="success" align-center>
      <el-step title="待审核"></el-step>
      <el-step title="已审核"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: ['step', 'type'],
}
</script>

<style lang="scss" scoped>
.steps {
  width: 400px;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  margin: 20px auto;

  /deep/ .el-step__title.is-success {
    color: #cf913f;
  }

  /deep/ .el-step__head.is-success {
    color: #cf913f;
    border-color: #cf913f;
  }
}
</style>