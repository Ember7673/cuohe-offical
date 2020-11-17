<!--
 * @Author: wangtengteng
 * @Date: 2020-11-12 16:48:21
 * @LastEditTime: 2020-11-13 14:43:58
 * @FillPath: Do not edit
-->
<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    name: 'App',
    components: {
      HelloWorld
    }
  }
</script>

<style>
  #app {}
</style>