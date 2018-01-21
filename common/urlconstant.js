const api = 'https://m.mpet.club/api/';
module.exports = {
    INFO: {
        MYVIDEOLIST: api+"weixin/info/findSelfInfoMsgByPage", // 分页获取自己发布的视频列表
        HOMEVIDEOLIST: api+"weixin/info/findHomeInfoMsgByPage",//分页获取首页视频列表
        DELMEG: api+"weixin/info/findHomeInfoMsgByPage",//删除消息
        PUBLISHVIDEO: api+"weixin/info/saveMsg",//发布视频
        VIDEODETAIL: api+"weixin/info/findInfoMsgDetails",//获取视频详情
        VIDEOPLAY: api+"weixin/info/video/updVideoPlayTime",
    },
    COMMENT: {
        LIKE: api+"mobile/info/reply/hitMsg",
        REPLY: api+"mobile/info/reply/replyInfoMsg",
    },
    LOGIN: {
        LOGIN: api+"weixin/user/weixinLogin",
    },
    SYS: {
        SAVELOCATION: api+"weixin/sys/saveLocation",
        CHECKPASS: api+"weixin/sys/checkExaminePass",
        UPLOADFILE: api+"weixin/sys/uploadFile",
        QRCODE: api+"weixin/sys/downloadMiniQrCode",
        DAYLIST: api+"weixin/sys/findDayList",
    },
    USER: {
        SAVEUSERINFO: api+"weixin/user/saveUserInfo",
        SAVECONTACTINFO: api+"weixin/user/saveContactInfo",
        GETUSERINFO: api+"weixin/user/findWeiXinUserInfo",
        GETLEADERBOARDS: api+"weixin/user/findUserLeaderboards",
    },
    COMMON:{
        CONTACT: api+"common/findCustomerServiceContact",
    }
}