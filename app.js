//app.js
let CONSTANT = require('common/constant.js');
let util = require("utils/util.js");

App({
    onLaunch: function () {
        //登录
        // wx.checkSession({
        //   success: () => {
        //     //session 未过期，并且在本生命周期一直有效
        //     // if (!wx.getStorageSync('session_key')){
        //     //   this.login();
        //     // }
        //     this.saveUserInfo(wx.getStorageSync('session_key'))
        //   },
        //   fail: () => {
        //     //登录态过期
        //     this.login();
        //     console.log('登录态过期')
        //   }//

        // })
        this.login();
    },
    login: function (callback) {
        let that = this;
        wx.login({//login流程
            success: (res) => {//登录成功
                if (res.code) {
                // 微信小程序登录
                // return;
                    wx.request({
                        url: CONSTANT.URL.LOGIN.LOGIN,
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                            code: res.code
                        },
                        dataType: 'json',
                        method: 'GET',
                        success: function (item) {
                            let id = item.data.data.bussData.sessionId;
                            wx.setStorageSync('sessionId', id)
                            callback && callback();
                            that.saveUserInfo(id)
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res)
                }
            }
        })
    },
    saveUserInfo(id) {
        wx.getUserInfo({
            withCredentials: true,
            success: function (item) {
                wx.setStorageSync("userInfo", item.userInfo)
                let encryptedData = item.encryptedData,
                    iv = item.iv,
                    sessionId = wx.getStorageSync("sessionId");
                util.http(CONSTANT.URL.USER.SAVEUSERINFO, {
                    encryptedData: encryptedData,
                    iv: encryptedData,
                    sessionId: sessionId
                }, "POST", (data) => {
                    console.log(data)
                }, null, null)
                //
                // wx.getLocation({
                //     type: 'gcj02',
                //     success: function (res) {
                //         wx.request({
                //             url: CONSTANT.URL.WX.SAVE,
                //             header: {
                //                 'content-type': 'application/x-www-form-urlencoded'
                //             },
                //             data: {
                //                 sessionId: id,
                //                 encryptedData: encryptedData,
                //                 iv: iv,
                //                 longitude: res.longitude,
                //                 latitude: res.latitude,
                //                 altitude: res.altitude
                //             },
                //             dataType: 'json',
                //             method: 'POST',
                //             success: function (res) {
                //                 console.log('信息保存成功')
                //             }
                //         })
                //     }
                // })
            },
            fail: function (res) {
                wx.openSetting({
                    success: (res) => {
                        if (res.authSetting['scope.userInfo']) {
                            wx.getUserInfo({
                                withCredentials: false,
                                success: function(data) {
                                    wx.setStorageSyncInfo("userInfo", data.userInfo)
                                }
                            })
                        }
                    }
                })
            }
        })

    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },
    globalData: {
        userInfo: null,
        videoSrc: ""
    }
})
