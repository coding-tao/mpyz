import Vue from 'vue';
import Router from 'vue-router';
const register = resolve => require(['@/page/common/register'], resolve) 
const loginPage = resolve => require(['@/page/common/login-page'], resolve) 
const rechargePassword = resolve => require(['@/page/common/recharge-password'], resolve) 
const userList = resolve => require(['@/page/userManager/userList'], resolve) 
const videoList = resolve => require(['@/page/videoManager/videoList'], resolve) 
const commentList = resolve => require(['@/page/commentManager/commentList'], resolve) 
const customList = resolve => require(['@/page/customManager/customList'], resolve) 

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
          name: 'userList',
          component: userList
      },
      {
          path: '/videoList',
          name: 'videoList',
          component: videoList
      },
      {
          path: '/commentList',
          name: 'commentList',
          component: commentList
      },
      {
          path: '/customList',
          name: 'customList',
          component: customList
      }
  ]
})
