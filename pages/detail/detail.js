var app = getApp();
var constant = require("../../common/constant.js");
var util = require("../../utils/util.js");

Page({
    data: {
        src: "",
        detail: {},
        replyInfo: "",
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '自定义转发标题',
            path: '/page/user?id=123',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    onShow() {

    },
    onUnload() {
        if (!this.data.playTime)return;
        this.videoPlay()
    },
    onLoad(e) {
        this.setData({
            msgId: e.id
        })
        this.getDetail()
    },
    getDetail(){
        util.http(constant.URL.INFO.VIDEODETAIL, {msgId: this.data.msgId}, "POST", (data) => {
            this.setData({
                detail: data.data.bussData
            })
        }, null, ()=>{
            this.getDetail()
        })
    },
    videoPlay(){
        const { msgId, playTime } = this.data;
        util.http(constant.URL.INFO.VIDEOPLAY, { msgId: msgId, playTime: playTime }, "POST", (data) => { }, null, ()=>{
            this.videoPlay()
        })
    },
    handleUpdate(e) {
        this.setData({
            playTime: Math.floor(e.detail.currentTime)
        })
    },
    handleClickLike() {
        const {msgId} = this.data;
        util.http(constant.URL.COMMENT.LIKE, {msgId: msgId}, "POST", (data) => {
            // console
            wx.showToast({
                title: data.msg,
                icon: 'success',
                duration: 2000
            });
        }, null, null)
    },
    handleChange(e) {
        this.setData({
            replyInfo: e.detail.value
        })
    },
    handleClickSend() {
        let self = this;
        const {msgId, replyInfo, focus, replyParams} = this.data;
        console.log(replyParams)
        let params = {
            replyInfo: replyInfo
        }
        params = Object.assign(params, replyParams)
        if (focus) { //回复
            util.http(constant.URL.COMMENT.REPLY, params, "POST", (data) => {
                util.http(constant.URL.INFO.VIDEODETAIL, {msgId: this.data.msgId}, "POST", (data) => {
                    self.setData({
                        detail: data.data.bussData
                    })
                }, null, null)
                wx.showToast({
                    title: "回复成功",
                    icon: 'success',
                    duration: 2000
                });
                this.setData({
                    replyInfo: "",
                    focus: false
                })
            }, null, null)
        } else {  //评论
            util.http(constant.URL.COMMENT.REPLY, {msgId: msgId, replyInfo: replyInfo}, "POST", (data) => {
                util.http(constant.URL.INFO.VIDEODETAIL, {msgId: this.data.msgId}, "POST", (data) => {
                    self.setData({
                        detail: data.data.bussData
                    })
                }, null, null)
                wx.showToast({
                    title: data.msg,
                    icon: 'success',
                    duration: 2000
                });
                this.setData({
                    replyInfo: "",
                })
            }, null, null)
        }

    },
    handleClickReply(e) {
        console.log(e)
        let msgId = e.target.dataset.msgid || e.currentTarget.dataset.msgid,
            parentId = e.target.dataset.parentid || e.currentTarget.dataset.parentid;
        this.setData({
            focus: true,
            replyParams: {
                msgId: msgId,
                parentId: parentId
            }
        })
    }
})