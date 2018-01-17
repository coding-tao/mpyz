import Vue from 'vue';
import Router from 'vue-router';
const register = resolve => require(['@/page/common/register'], resolve) 
const loginPage = resolve => require(['@/page/common/login-page'], resolve) 
const rechargePassword = resolve => require(['@/page/common/recharge-password'], resolve) 
const levelList = resolve => require(['@/page/levelManage/levelList'], resolve) 
const integralList = resolve => require(['@/page/levelManage/integralList'], resolve) 
const exchangeList = resolve => require(['@/page/mallManage/exchangeList'], resolve) 
const goodsList = resolve => require(['@/page/mallManage/goodsList'], resolve) 
const goodEdit = resolve => require(['@/page/mallManage/goodEdit'], resolve) 
const lotteryList = resolve => require(['@/page/lotteryManage/lotteryList'], resolve) 
const prizeList = resolve => require(['@/page/lotteryManage/prizeList'], resolve) 
const prizeEdit = resolve => require(['@/page/lotteryManage/prizeEdit'], resolve) 
const activityList = resolve => require(['@/page/activityManage/activityList'], resolve) 
const activityEdit = resolve => require(['@/page/activityManage/activityEdit'], resolve) 
const infoManage = resolve => require(['@/page/platformManage/infoManage'], resolve) 
const bannerList = resolve => require(['@/page/platformManage/bannerList'], resolve) 
const opinionList = resolve => require(['@/page/platformManage/opinionList'], resolve) 
const poster = resolve => require(['@/page/platformManage/poster'], resolve) 

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/sys/', 
  routes: [
      {
          path: '/loginPage',
          name: 'loginPage',
          component: loginPage
      },
      {
        path: '/register',
        name: 'register',
        component: register
      },
      {
        path: '/rechargePassword',
        name: 'rechargePassword',
        component: rechargePassword
      },
      {
          path: '/',
          name: 'levelList',
          component: levelList
      },
      {
          path: '/integralList',
          name: 'integralList',
          component: integralList
      },
      {
          path: '/exchangeList',
          name: 'exchangeList',
          component: exchangeList
      },
      {
          path: '/goodsList',
          name: 'goodsList',
          component: goodsList
      },
      {
          path: '/goodEdit',
          name: 'goodEdit',
          component: goodEdit
      },
      {
        path: '/lotteryList',
        name: 'lotteryList',
        component: lotteryList
     },
     {
        path: '/prizeList',
        name: 'prizeList',
        component: prizeList
     },
     {
        path: '/prizeEdit',
        name: 'prizeEdit',
        component: prizeEdit
     },    
     {
        path: '/activityList',
        name: 'activityList',
        component: activityList
    },
    {
        path: '/activityEdit',
        name: 'activityEdit',
        component: activityEdit
    },
    {
        path: '/infoManage',
        name: 'infoManage',
        component: infoManage
    },
    {
      path: '/bannerList',
      name: 'bannerList',
      component: bannerList
    },
    {
        path: '/opinionList',
        name: 'opinionList',
        component: opinionList
    },
    {
        path: '/poster',
        name: 'poster',
        component: poster
    }
  ]
})
