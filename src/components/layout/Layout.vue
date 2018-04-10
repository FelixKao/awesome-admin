<template>
  <div class="app-container" :class="{ collapseSidebar: isSidebarCollapse}">
    <side-bar class="side-bar-container"></side-bar>
    <div class="main-container">
      <nav-bar></nav-bar>
      <div class="content-container">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './side-bar'
import NavBar from './nav-bar'
import { mapGetters } from 'vuex'

export default {
  name: 'layout',
  components: {
    SideBar,
    NavBar
  },
  computed: {
    ...mapGetters(['isSidebarCollapse'])
  }
}
</script>

<style lang="sass" scoped>
.app-container
  widthL 100%
  height: 100vh
  &.collapseSidebar
    .side-bar-container
      width: 64px
    .main-container
      margin-left: 64px
  .side-bar-container
    width: 200px
    height: 200%
    z-index: 999
    left: 0
    top: 0
    position: fixed
  .main-container
    min-width: 900px
    margin-left: 200px
    height: 100%
    .content-container
      margin: 10px
      height: calc(100% - 80px)
</style>
