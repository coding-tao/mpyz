// const api = 'https://vip.glocalme.com/api/admin/';
const api =  'https://glocalme.icebartech.com/api/admin/'
module.exports = {
  //管理员
  ADMIN: {
    LOGIN: api + 'login', //登录接口
    MODIFYPWD: api + 'updUserPWD' ,//重置密码接口
    LOGOUT:api+'logout'//登出
  },
  //活动
  ACTIVITY:{
    ACTIVITYPAGE:api+'activity/findActivityByPage',//分页查找活动
    SAVEACTIVITY:api+'activity/saveActivity',//保存后台活动
    DELETEACTIVITY:api+'activity/deleteActivityById',//删除后台活动 
    FINDACTIVITY:api+'activity/findActivityById'//根据id查找活动
  },
  GOOD:{
    FINDGOODSPAGE:api+'goods/findGoodsByPage',//分页查找商品
    FINDEXCHANGE:api+'goods/findGoodsExchangeByPage',//分页查找商品兑换情况
    DELETEGOODS:api+'goods/deleteGoodsById',//删除商品
    SAVEGOODS:api+'goods/saveGoods',//保存商品
    CHANGEGOODSTATUS:api+'goods/changeGoodsStatus',//后台发货
    GETGOODSDETAIL:api+'goods/getGoodsById',//根据id获取商品详情  
    EXPORTEXCHANGELIST:api+'goods/goodsExchangeList2Excel' //导出兑换列表
  },
  PLATFORM:{
    SAVEBANNER:api+'platform/saveBanner',//保存排行榜照片
    SAVEPOINT:api+'platform/savePointsRule',//保存积分规则
    FINDADVICEPAGE:api+'platform/findAdviceByPage',//分页查找建议
    DELETEACVICE:api+'platform/deleteAdviceByIds',//删除建议
    GETABOUTUS:api+'platform/getAboutUs',//获取关于我们
    GETPOINTRULE:api+'platform/getPointsRule',//获取积分规则
    GETRANKING:api+'platform/getRanking',//获取排行榜海报
    SAVEABOUTUS:api+'platform/saveAboutUs',//保存关于我们
    GETADVICEBANNER:api+'platform/getAdvertiseBanner'
  },
  SYS:{
    UPLOADFILE:api+'sys/uploadFile',//微信端上传文件

  },
  GIFT:{
    FINDGIFTEXCHANGEBYPAGE:api+'gift/findGiftExchangeByPage',    // 分页获取奖品兑换情况 
    FINDGIFTBYPAGE:api+'gift/findGiftByPage',    // 分页获取奖品
    DELETEGIFTBYID:api+'gift/deleteGiftById',   // 删除奖品
    GETGIFTBYID:api+'gift/getGiftById',   // 获取奖品详情  by id 
    SAVEGIFT:api+'gift/saveGift',  // 保存奖品
    CHANGEGIFTORDER:api+'gift/changeGiftGiftOrder',  // 修改顺序
    CHANGEGIFTSTATUS:api+'gift/changeGiftStatus'
  },
  USER:{
    FINDUSERPOINTS:api+'weixinuser/findWeixinUserPointsDetailByPage',   // 分页获取用户吉分
    FINDUSERBYPAGE:api+'weixinuser/findWeixinUserCoreByPage',  // 分页获取用户列表
    CHANGEPOINT:api+'weixinuser/changeUserPoints'//修改吉分
  }
}
