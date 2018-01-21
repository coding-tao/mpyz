var app = getApp();
var constant = require("../../common/constant.js");
var util = require("../../utils/util.js");

Page({
    data: {
        src: "",
        windowHeight: "",
        showPreview: true,
        msgContent: "",
    },
    onShow() {

    },
    onLoad() {
        let self = this;
        this.setData({
            src: app.globalData.videoSrc
        })
    },
    handleChange(e) {
        this.setData({
            msgContent: e.detail.value
        })
    },
    handlePlay() {
        this.setData({
            showPreview: false
        })
    },
    handleClickPublish() {
        const {msgContent, src} = this.data;
        let sessionId = wx.getStorageSync("sessionId");
        wx.uploadFile({
            url: constant.URL.INFO.PUBLISHVIDEO+"?sessionId="+sessionId,
            filePath: src,
            name: 'videoFile',
            formData: { msgContent: msgContent},
            success: (data) => {
                console.log(data)
                wx.showToast({
                    title: data.msg,
                    icon: 'success',
                    duration: 5000
                });
                wx.redirectTo({
                    url: "/pages/home/home"
                })
            },
            fail(data) {
                console.log('fail------');
                console.log(data)
            }
        })
        // util.http(constant.URL.INFO.PUBLISHVIDEO, {msgContent: msgContent, videoFile: src}, "POST", (res) => {
        //     console.log(res)
        // }, null, null)
        // wx.navigateTo({
        //     url: "/pages/detail/detail"
        // })
    }
})