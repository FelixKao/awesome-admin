<template>
  <el-menu
    :default-active="defaultActive"
    :collapse="isSidebarCollapse"
    background-color="#2D2F33"
    text-color="#fff"
    active-text-color="#409EFF"
    :router="true"
  >
    <el-submenu
      v-for="menu in menus"
      :key="menu.index"
      :index="menu.index"
      v-if="menu.menus"
    >
      <template slot="title">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.title }}</span>
      </template>
      <el-submenu
        v-for="submenu in menu.menus"
        :key="submenu.index"        
        :index="submenu.index"
        v-if="submenu.menus"
      >
        <template slot="title">{{ submenu.title }}</template>
        <el-menu-item
          v-for="thirdLevelMenu in submenu.menus"
          :key="thirdLevelMenu.index"
          :index="thirdLevelMenu.index"
        >
          {{ thirdLevelMenu.title }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="submenu.index">
        {{ submenu.title }}
      </el-menu-item>
    </el-submenu>
    <el-menu-item v-else :index="menu.index">
      <i :class="menu.icon"></i>
      <span slot="title">{{ menu.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { getMenu } from '@/api/menu'
import { mapGetters } from 'vuex'

export default {
  created () {
    this._getMenu()
  },
  data () {
    return {
      defaultActive: '',
      menus: []
    }
  },
  methods: {
    _getMenu () {
      const COMMON_MENUS = [{ index: '/dashboard', icon: 'el-icon-location', title: '首页' }]
      getMenu().then(res => {
        this.menus = [...COMMON_MENUS, ...res.data]
      }).catch(() => {
        this.menus = COMMON_MENUS
      })
    }
  },
  computed: {
    ...mapGetters(['isSidebarCollapse'])
  },
  watch: {
    $route () {
      this.defaultActive = this.$route.path
    }
  }
}
</script>

<style lang="sass" scoped>
i
  color: #fff
</style>
