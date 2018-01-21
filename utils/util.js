const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function http(url, data, method = 'POST', success, fail, revertBack) {
    const sessionId = wx.getStorageSync('sessionId');
    wx.request({
        url: `${url}?sessionId=${sessionId}`,
        data,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method,
        success: function (res) {
            if (res.data.status == '200') {
                success && success(res.data);
            }
            else if (res.data.status == '401') {
                let appInstance = getApp();
                appInstance.login(revertBack);
            }
            else {
                fail && fail(res);
            }
        },
        fail: function (res) {
            // 请求失败，错误处理
            // errorHander(res);
            console.log(res,'failfail')
        }
    })
}

function errorHander(res) {
    wx.showToast({
        title: res.data.msg,
        duration: 2000,
        image: '../../images/fail.png'
    })
}

module.exports = {
    formatTime: formatTime,
    formatNumber: formatNumber,
    http: http,
    errorHander: errorHander
}
