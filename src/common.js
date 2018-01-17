//公共方法
var Vue = require('vue');

function requestAjax(url,param,callBack,failBack=null) {
    let id = getCookie('sessionId'),
        api = url+'?sessionId='+id;
    Vue.default.http.post(api, param, {emulateJSON: true}).then(res => {
        callBack(res.data)
    }, res => {
        if(failBack){
            failBack(res.data)
        }
    });
}

//读取cookie：
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");　　
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

function dateFormate(num,type='date'){
    var d=new Date(num);
    var year=d.getFullYear();
    var day=d.getDate();
    var month=+d.getMonth()+1;
    var hour=d.getHours();
    var minute=d.getMinutes();
    var second=d.getSeconds();
    if(type=='date'){
        var f=year+"-"+formate(month)+"-"+formate(day)+" "+formate(hour)+":"+formate(minute)+":"+formate(second);
    }else if(type=='birth'){
        var f=year+"-"+formate(month)+"-"+formate(day)
    }
    
    function formate(d){
        return d>9?d:'0'+d;
    }
    return f;
}


//设置cookie：
function setCookie(name, value){
    let Days = 1,
    exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}


module.exports = {
  requestAjax,
  dateFormate,
  getCookie,
  setCookie
}
