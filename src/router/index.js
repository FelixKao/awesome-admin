import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import { getToken } from '@/util/token'

import 'nprogress/nprogress.css'

Vue.use(Router)

const Layout = () => import('@/components/layout/layout')
const Login = () => import('@/pages/login/login')
const Dashboard = () => import('@/pages/dashboard/dashboard')
const ComponentsHome = { template: '<div>组件简述页面</div>' }
const Form = { template: '<div>表单页面</div>' }
const General = { template: '<router-view/>' }
const GeneralHome = { template: '<div>基础组件简述页面</div>' }
const Color = { template: '<div>色彩页面</div>' }
const Icon = { template: '<div>图标页面</div>' }
const TableHome = { template: '<div>表格简述页面</div>' }
const TableExample = { template: '<div>表格实例页面</div>' }

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        { path: 'dashboard', component: Dashboard, name: '首页' }
      ]
    },
    {
      path: '/components',
      component: Layout,
      name: '组件',
      redirect: '/components/index',
      children: [
        { path: 'index', component: ComponentsHome, name: '组件简述' },
        { path: 'form', component: Form, name: '表单' },
        {
          path: '/components/general',
          component: General,
          name: '基础组件',
          redirect: '/components/general/index',
          children: [
            { path: 'index', component: GeneralHome, name: '基础组件简述' },
            { path: 'color', component: Color, name: '色彩' },
            { path: 'icon', component: Icon, name: '图标' }
          ]
        }
      ]
    },
    {
      path: '/table',
      component: Layout,
      name: '表格',
      redirect: '/table/index',
      children: [
        { path: 'index', component: TableHome, name: '表格简述' },
        { path: 'example', component: TableExample, name: '表格实例' }
      ]
    },
    { path: '*', component: Layout, redirect: '/dashboard' }
  ]
})

// Turn off loading spinner
NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
  } else {
    getToken() ? next() : next('/login')
  }
  NProgress.done()
})

export default router
