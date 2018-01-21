var app = getApp();
var constant = require("../../common/constant.js");
var util = require("../../utils/util.js");

Page({
    data: {
        publish: {

        },
        pageIndex: 1,
    },
    onShow() {
        this.getDetail()
    },
    getDetail(){
        const { pageIndex } = this.data;
        util.http(constant.URL.INFO.MYVIDEOLIST, { pageIndex: pageIndex, pageSize: 50 }, "POST", (data) => {
            this.setData({
                publish: data.data.bussData
            })
        }, null, ()=>{
            this.getDetail()
        })
    },
    handleClickPublish(e) {
        let id = e.target.id || e.currentTarget.id;
        wx.navigateTo({
            url: "/pages/detail/detail?id="+id
        })
    },
    onReachBottom() { //上拉触底分页
        let self = this;
        const {publish, pageIndex} = this.data;
        util.http(constant.URL.INFO.HOMEVIDEOLIST, {pageIndex: pageIndex+1, pageSize: 50}, 'POST', (res) => {
            self.setData({
                publish: publish.concat(res.data.bussData),
                pageIndex: pageIndex+1
            })
        }, null, null)
    }
})