<!--
 * @Author: wangtengteng
 * @Date: 2020-11-21 15:21:43
 * @LastEditTime: 2020-11-22 17:23:18
 * @FillPath: Do not edit
-->
<template>

  <div v-if="visible" class="loginDialog authModule__wrapper">
    <div class="loginDialogPanel">
      <i v-if="visible" class="closeIcon el-icon-circle-close" @click="onClose"></i>
      <sign-in v-if="$type === 'SignIn' && visible" :redirect-object="redirectObject" />
      <register v-if="$type === 'Register' && visible" :redirect-object="redirectObject" />
    </div>
    <div class="v-modal" tabindex="0" style="z-index: 998; background:rgba(255,255,2550,.35)" v-if="visible"></div>
  </div>

</template>
<script type="text/babel">
import SignIn from './login';
import Register from './register';

export default {
  props: {
    visible: {
      default: false
    },
    $type: {
      default: 'SignIn'
    },
    redirectObject: {
      type: Object,
      default: null
    }
  },
  components: {
    SignIn,
    Register
  },
  watch: {
    redirectObject (val) {
      if (val) {
        this.$redirect = val;
      }
    }
  },
  methods: {
    onClose () {
      console.log(111)
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.authModule__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  z-index: 2001;

  .loginDialogPanel {
    width: 500px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3000;
    background: #fff;
    padding: 50px 40px 50px 40px;

    .closeIcon {
      position: absolute;
      top: 8px;
      right: 11px;
      font-size: 30px;
    }
  }
}
</style>