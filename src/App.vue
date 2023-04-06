<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {exitAccountApi} from "@/api/userApi";

  export default {
    name: 'App',
    components: {

    },
    beforeDestroy() {
      exitAccountApi();
    }
  }
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>
