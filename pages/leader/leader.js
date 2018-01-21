var app = getApp();
var constant = require("../../common/constant.js");
var util = require("../../utils/util.js");

Page({
    data: {
        leader: {}
    },
    onShow() {
        this.setData({
            userInfo: wx.getStorageSync("userInfo")
        })
        util.http(constant.URL.USER.GETLEADERBOARDS, {}, "POST", (data) => {
            this.setData({
                leader: data.data.bussData
            })
        }, null, null)
    },
    onLoad() {

    }
})