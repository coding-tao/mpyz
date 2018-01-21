const api =  'https://m.mpet.club/api/'
module.exports = {
  //管理员
  ADMIN: {
    LOGIN: api + 'admin/user/login', //登录接口
    MODIFYPWD: api + 'admin/user/updUserPWD' ,//重置密码接口
    LOGOUT:api+'admin/user/logout'//登出
  },
  //活动
  USER:{
    USERLIST:api+'admin/weixin/userList',//小程序用户列表
  },
  //活动
  COMMON:{
    FINDCONCAT:api+'common/findCustomerServiceContact',//联系方式
    UPDATECONCAT:api+'common/updCustomerServiceContact',//修改联系方式
  },
  //信息
  INFO:{
    FINDINFOPAGE:api+'admin/info/findInfoMsgByPage',
    FINDREPLYPAGE:api+'admin/info/reply/findInfoMsgReplyByPage',
    DELETEREPLY:api+'admin/info/deleteMsg'
  }
}
