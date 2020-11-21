<!--
 * @Author: wangtengteng
 * @Date: 2020-11-12 16:48:21
 * @LastEditTime: 2020-11-20 19:53:27
 * @FillPath: Do not edit
-->
<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
  import Header from '@/components/common/header';
  export default {
    name: 'App',
    components: {
      Header
    }
  }
</script>

<style>
  #app {
    padding: 0;
    margin: 0;
  }
</style>