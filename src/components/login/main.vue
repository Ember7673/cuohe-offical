<!--
 * @Author: wangtengteng
 * @Date: 2020-11-21 15:21:43
 * @LastEditTime: 2020-11-24 16:31:12
 * @FillPath: Do not edit
-->
<template>
  <div v-if="visible" class="loginDialog authModule__wrapper">
    <div class="loginDialogPanel">
      <i v-if="visible" class="closeIcon el-icon-circle-close" @click="onClose"></i>
      <sign-in v-if="$type === 'SignIn' && visible" :redirect-object="redirectObject" />
      <register v-if="$type === 'Register' && visible" :redirect-object="redirectObject" />
    </div>
    <div class="v-modal" tabindex="0" style="z-index: 998;" :class="isIndexPage ? 'bg1' : 'bg2'" v-if="visible"></div>
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
    },
    isIndexPage: true
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
    },
    visible (val) {
      if (window.location.hash === '#/') {
        this.isIndexPage = true;
      } else {
        this.isIndexPage = false;
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

  .bg1 {
    background: rgba(255, 255, 255, 0.35);
  }

  .bg2 {
    background: rgba(0, 0, 0, 0.35);
  }

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
    border-radius: 10px;
    .closeIcon {
      position: absolute;
      top: 8px;
      right: 11px;
      font-size: 30px;
    }
  }
}
</style>