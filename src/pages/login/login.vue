<template>
  <div class="login-container">
    <div class="login-pad">
      <div class="logo">
        <p>iAdmin</p>
      </div>
      <div class="form">
        <el-form
          label-position="left"
          label-width="70px"
          :model="loginForm"
          :rules="loginRules"
          autoComplete="on"
          ref="loginForm"
          @keyup.enter.native="handleLogin('loginForm')"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="handleLogin('loginForm')"
            style="width:100%;"
          >
            登录
          </el-button>
        </el-form>
      </div>
      <div class="failed-message">
        {{ failedMessage }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          username: 'admin',
          password: 'admin'
        },
        loginRules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        },
        loading: false,
        failedMessage: ''
      }
    },
    methods: {
      handleLogin (formName) {
        this.failedMessage = ''
        this.$refs[formName].validate((valid) => {
          if (!valid) return false
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((response) => {
            this.loading = false
            const token = response.data.token
            if (token) {
              this.$router.push('/')
            } else {
              this.failedMessage = response.data.message
              setTimeout(() => {
                this.failedMessage = ''
              }, 3000)
            }
          }).catch(() => {
            this.loading = false
          })
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
@import '../../assets/sass/mixin.sass'
@import '../../assets/sass/variable.sass'

.login-container
  width: 100%
  height: 100%
  @include bg-image('../../assets/images/login_bg.jpg')
  @include flex-center-center
  .login-pad
    width: 350px
    height: 230px
    padding: 20px
    border-radius: 6px
    background-color: #fff
    transform: translateY(-30%)
    .logo
      margin-bottom: 20px
      p
        font-size: $font-size-extra-large
        color: $main-color
        text-align: center
    .failed-message
      height: 20px
      font-size: $font-size-small
      padding-top: 10px
      color: #f00
</style>