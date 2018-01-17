export default {
  routerList: [{
      path: '/',
      name: '用户管理',
      icon:'el-icon-document',
      itemList: [{
        name: '用户列表',
        path: '/'
      }]
    },{
      path: '/1',
      name: '视频管理',
      icon:'el-icon-document',
      itemList: [{
        name: '视频列表',
        path: '/videoList'
      }]
    },{
      path: '/2',
      name: '评论管理',
      icon:'el-icon-document',
      itemList: [{
        name: '评论列表',
        path: '/commentList'
      }]
    },{
      path: '/3',
      name: '客服管理',
      icon:'el-icon-document',
      itemList: [{
        name: '客服联系方式设置',
        path: '/customList'
      }]
    }
  ]
}
