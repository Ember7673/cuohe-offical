<!--
 * @Author: wangtengteng
 * @Date: 2020-11-12 16:48:21
 * @LastEditTime: 2020-11-17 11:04:09
 * @FillPath: Do not edit
-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Login></Login>
    <!-- <Register></Register> -->
  </div>
</template>

<script>
  import Login from '@/components/login/login';
  import Register from '@/components/login/register'
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    components: {
      Login,
      Register
    },
    methods: {

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>