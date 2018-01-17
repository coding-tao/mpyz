// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import $ from 'jquery'
import common from './common'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/js/modal.js'
import 'bootstrap/js/dropdown.js'
import 'bootstrap/js/tooltip.js'
import 'font-awesome/css/font-awesome.css'
import 'summernote'
import 'summernote/dist/lang/summernote-zh-CN.js'
import 'summernote/dist/summernote.css'


Vue.use(VueResource);
Vue.use(ElementUI)
// router.beforeEach((to, from, next) => {
//   console.log(common.getCookie('sessionId'))
//   if(!common.getCookie('sessionId')){
//     router.push("/loginPage");    
//     next()
//   }
//   next()
// })
Vue.http.interceptors.push(function(request, next) {//拦截器
  // Vue.http.options.xhr = { withCredentials: true }
  // Vue.http.options.emulateHTTP = true
  // Vue.http.options.credentials = true;
  // Vue.http.options.emulateJSON = true;
  // Vue.http.options.emulateJSON = true
  next((res)=>{
    //401 登陆过期跳转
    if(res.data.status == 401){
      console.log(router)
      router.push("/loginPage");
      common.setCookie('sessionId','')
    }
  })
})

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
