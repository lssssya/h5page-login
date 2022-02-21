<template>
  <router-view></router-view>
</template>

<script>
// import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    // const store = useStore()
    // store.dispatch('setUserInfo')
    return {}
  }
}
</script>

<style>
#app {
  height: 100%;
  overflow: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* 隐藏高德地图标识 */
.amap-logo,
.amap-copyright {
  display: none !important;
}
</style>
