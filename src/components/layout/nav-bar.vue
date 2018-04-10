<template>
  <el-header class="header-container">
    <div class="collpse-container" @click="toggleSidebar">
      <i class="el-icon-d-arrow-right" v-if="isSidebarCollapse"></i>
      <i class="el-icon-d-arrow-left" v-else></i>
    </div>

    <el-breadcrumb separator="/" class="breadcrumb-container">
      <el-breadcrumb-item
        v-for="route in routeList"
        :key="route.path"
        :to="{path: route.path}"
      >
        {{ route.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-tag
      class="tag-container"
      v-for="tag in visitedViews"
      :key="tag.name"
      closable
      @close="handleClose(tag, $event)"
      size="mini"
      :type="isActive(tag.path) ? 'primary' : 'info'" 
    >
      <router-link :to="tag.path" :class="{ active: isActive(tag.path) }">
        {{ tag.name }}
      </router-link>
    </el-tag>

    <ul class="nav-container">
      <li class="nav-item">
        <el-dropdown>      
          <img src="../../assets/images/avator.png" alt="头像" class="avator">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="userDialogVisible = true">用户中心</el-dropdown-item>
            <el-dialog
              title="用户中心"
              :visible.sync="userDialogVisible"
              :append-to-body="true"
              width="360px"
            >
              <el-card :body-style="{ padding: '0px' }">
                <img src="../../assets/images/avator.png" style="width:325px;height:300px;">
                <div style="padding:14px;">
                  <span>好吃的汉堡</span>
                  <div>
                    <time>2017年11月15日 加入</time>
                  </div>
                </div>
              </el-card>
            </el-dialog>
            <el-dropdown-item @click.native="settingDialogVisible = true">设置</el-dropdown-item>
            <el-dialog
              title="设置"
              :visible.sync="settingDialogVisible"
              :append-to-body="true"
            >
              <el-form label-width="100px" label-position="left">
                <el-form-item label="主题色选择">
                  <el-radio v-model="radio" label="1">
                    <el-button type="primary"></el-button>
                  </el-radio>
                  <el-radio v-model="radio" label="2">
                    <el-button type="success"></el-button>
                  </el-radio>
                  <el-radio v-model="radio" label="3">
                    <el-button type="danger"></el-button>
                  </el-radio>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="settingDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="settingDialogVisible = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    this._getBreadcrumb()
  },
  data () {
    return {
      routeList: [],
      userDialogVisible: false,
      settingDialogVisible: false,
      formLabelWidth: '120px',
      radio: '1'
    }
  },
  computed: {
    ...mapGetters([
      'isSidebarCollapse',
      'visitedViews'
    ])
  },
  methods: {
    toggleSidebar () {
      this.$store.dispatch('toggleSidebar')
    },
    _getBreadcrumb () {
      this.routeList = this.$route.matched.filter(item => item.name)
      this._addViewTabs()
    },
    _addViewTabs () {
      const route = this.$route
      if (route.name) this.$store.dispatch('addVisitedViews', route)
    },
    isActive (path) {
      return path === this.$route.path
    },
    handleClose (view, $event) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
      $event.preventDefault()
    },
    logout () {
      this.$store.dispatch('Logout').then(() => {
        this.$router.push({ path: '/login' })
      }).catch(() => {})
    }
  },
  watch: {
    $route () {
      this._getBreadcrumb()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/variable.sass'

.header-container
  width: 100%
  padding: 0
  background-color: #f5f5f5
  .collpse-container
    width: 60px
    text-align: center
    line-height: 60px
    cursor: pointer
    display: inline-block
    &:hover
      i
        font-weight: 700
        color: $main-color
  .breadcrumb-container
    width: 250px
    display: inline-block
  .tag-container
    margin: 3px
  .nav-container
    right: 10px
    display: inline-block
    position: absolute
    .nav-item
      font-size: 14px
      padding: 0 7px
      line-height: 60px
      cursor: pointer
      display: inline-block
      &:hover
        i,span
          color: #409EFF
      .avator
        width: 36px
        height: 36px
        vertical-align: middle
        border-radius: 50%
  .active
    color: #409EFF
</style>

