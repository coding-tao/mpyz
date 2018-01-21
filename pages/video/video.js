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
        if (!msgContent){
            wx.showToast({
                title: '内容不能为空',
                image: '../../assets/fail.png',
                duration: 1500
            })
            return;
        }
        let regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if (msgContent.match(regRule)) {
            wx.showToast({
                title: '禁止发表情',
                image: '../../assets/fail.png',
                duration: 1500
            })
            return;
        } 
        console.log(src,'ee')
        wx.uploadFile({
            url: constant.URL.INFO.PUBLISHVIDEO+"?sessionId="+sessionId,
            filePath: src,
            name: 'videoFile',
            formData: { msgContent: msgContent},
            success: ({data}) => {
                var data = JSON.parse(data);
                if(data.status == 200){
                    wx.showToast({
                        title:'发布成功',
                        icon: 'success',
                        duration: 1500
                    });
                    wx.redirectTo({
                        url: "/pages/home/home"
                    })
                }else{
                    wx.showToast({
                        title: data.msg,
                        image: '../../assets/fail.png',
                        duration: 1500
                    });
                }
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