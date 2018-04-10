<template>
  <div class="dashboard-container">
    <div class="content">
      <h1>更新日志</h1>
      <el-collapse
        v-for="item in items"
        :key="item.index"
        v-model="activeNames"
      >
        <el-collapse-item :title="item.title" :name="item.name">
          <div>{{ item.content }}</div>
        </el-collapse-item>      
      </el-collapse>
    </div>
    <div class="footer">
      如果您对本系统有任何问题或建议，请联系<address>felixkao@163.com</address>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data () {
      return {
        items: [
          {
            index: 1,
            title: 'v1.1.1 2017-12-01 10:20',
            name: '1',
            content: '[修复] 这里可以写一些更新内容的日志'
          },
          {
            index: 2,
            title: 'v1.1 2017-11-22 16:52',
            name: '2',
            content: '[修复] 这里可以写一些更新内容的日志'
          },
          {
            index: 3,
            title: 'v1.0 beta1 2017-11-21 16:25',
            name: '3',
            content: '[修复] 这里可以写一些更新内容的日志'
          }
        ],
        activeNames: ['1']
      }
    }
  }
</script>

<style lang="sass" scoped>
@import '../../assets/sass/variable'

.dashboard-container
  width: 800px
  min-height: 100%
  margin: 0 auto
  display: flex
  flex-direction: column
  .content
    flex: 1
    h1
      padding: 10px 0
      font-size: 20px
      font-weight: 700
    .el-collapse
      border-bottom: 0
  .footer
    text-align: center
    padding: 20px
    address
      display: inline-block
      color: $main-color
</style>