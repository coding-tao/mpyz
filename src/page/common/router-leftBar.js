export default {
  routerList: [{
      path: '/',
      name: '会员管理',
      icon:'el-icon-document',
      itemList: [{
        name: '会员列表',
        path: '/'
      },{
        name: '吉分流水',
        path: '/integralList'
      }]
    },{
      path: '/1',
      name: '吉分商城管理',
      icon:'el-icon-document',
      itemList: [{
        name: '兑换管理',
        path: '/exchangeList'
      },{
        name: '商品列表',
        path: '/goodsList'
      }]
    },{
      path: '/2',
      name: '抽奖管理',
      icon:'el-icon-document',
      itemList: [{
        name: '抽奖管理',
        path: '/lotteryList'
      },{
        name: '奖品管理',
        path: '/prizeList'
      }]
    },{
      path: '/3',
      name: '活动管理',
      icon:'el-icon-document',
      itemList: [{
        name: '活动管理',
        path: '/activityList'
      }]
    },{
      path: '/4',
      name: '平台管理',
      icon:'el-icon-document',
      itemList: [{
        name: '信息管理',
        path: '/infoManage'
      },{
        name: '意见反馈',
        path: '/opinionList'
      },{
        name: '轮播广告',
        path: '/bannerList'
      },{
        name: '排行榜海报',
        path: '/poster'
      }]
    }
  ]
}
