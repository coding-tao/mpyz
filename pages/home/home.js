var app = getApp();
var constant = require("../../common/constant.js");
var util = require("../../utils/util.js");

Page({
    data: {
        homeClass: "",
        overlayClass: "",
        className: "",
        showOverlay: false,
        showCover: true,
        showService: false,
        homeList: {

        },
        pageIndex: 1,
        userInfo: {
            avatarUrl: "",
            nickName: ""
        },
        contact: {}
    },
    onShow() {
        if (wx.getStorageSync("sessionId")) {
            this.setData({
                showCover: false
            })
        }
    },
    onLoad() {
        this.getList();
        this.getConcatList()
    },
    getList(){
        let self = this;
        const { pageIndex } = this.data;
        this.setData({
            userInfo: wx.getStorageSync("userInfo")
        })
        util.http(constant.URL.INFO.HOMEVIDEOLIST, { pageIndex: pageIndex, pageSize: 10 }, 'POST', (res) => {
            self.setData({
                homeList: res.data,
            })
        }, null, ()=>{
            self.getList()
        });
    },
    getConcatList(){
        let self = this;
        util.http(constant.URL.COMMON.CONTACT, {}, "POST", (res) => {
            self.setData({
                contact: res.data.bussData
            })
        }, null, (res) => {
            self.getConcatList()
        })
    },
    handleClickLeader() {
        wx.navigateTo({
            url: "/pages/leader/leader"
        })
    },
    handleClickItem(e) {
        let id = e.target.id || e.currentTarget.id;
        wx.navigateTo({
            url: "/pages/detail/detail?id="+id
        })
    },
    handleClickSelect() {
        this.setData({
            homeClass: "content_animation",
            overlayClass: "overlay",
            className: "",
            showOverlay: true
        })
    },
    handleChooseVideo() {
        var that = this;
        wx.chooseVideo({
            sourceType: ['camera'],
            maxDuration: 15,
            camera: 'back',
            success: function(res) {
                app.globalData.videoSrc = res.tempFilePath
                wx.navigateTo({
                    url: "/pages/video/video"  //video/video
                })
                // that.setData({
                //     src: res.tempFilePath
                // })
            }
        })
    },
    handleClickOverlay() {
        this.setData({
            homeClass: "",
            overlayClass: "",
            showOverlay: false
        })
    },
    handleClickPublish() {
        wx.navigateTo({
            url: "/pages/publish/publish"
        })
    },
    handleClickService() {
        this.setData({
            showService: true
        })
    },
    handleClickLeader() {
        wx.navigateTo({
            url: "/pages/leader/leader"
        })
    },
    handleClickCover() {
        this.setData({
            showCover: false
        })
    },
    handleCloseService() {
        this.setData({
            showService: false
        })
    },
    onReachBottom() { //上拉触底分页
        const {bussData} = this.data.homeList;
        const {pageIndex} = this.data;
        util.http(constant.URL.INFO.HOMEVIDEOLIST, {pageIndex: pageIndex+1, pageSize: 50}, 'POST', (res) => {
            self.setData({
                homeList: bussData.concat(res.data),
                pageIndex: pageIndex+1
            })
        }, null, null)
    }
})
