module.exports = [
  {
    index: '/components',
    icon: 'el-icon-star-on',
    title: '组件',
    menus: [
      { index: '/components/index', title: '组件简述' },
      { index: '/components/form', title: '表单' },
      {
        index: '/components/general',
        title: '基础组件',
        menus: [
          { index: '/components/general/index', title: '基础组件简述' },
          { index: '/components/general/color', title: '色彩' },
          { index: '/components/general/icon', title: '图标' }
        ]
      }
    ]
  },
  {
    index: '/table',
    icon: 'el-icon-men',
    title: '表格',
    menus: [
      { index: '/table/index', title: '表格简述' },
      { idnex: '/table/table-example', title: '表格实例' }
    ]
  }
]
