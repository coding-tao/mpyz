<template>
    <div class="wrap">
        <div class="login-wrap">
            <div class="login-title">GlocalMe吉客猫后台</div>
            <div id="darkbannerwrap"></div>
            <input type="text" @keyup.enter="login" v-model="account" placeholder="请输入账号">
            <input type="password" @keyup.enter="login"  v-model="password" placeholder="请输入密码">
            <div class="login-tips">
            </div>
            <div class="login-button">
                <button class="btn btn-primary" type="button" @click="login">登录</button>
            </div>
            <!-- <div class="login-tips">
                <a>忘记密码？</a>
            </div> -->
        </div>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js'),
    common = require('../../common.js');
export default {
    name: 'login',
    data() {
        return {
            account:'',
            password:'',
        }
    },
    mounted(){

    },
    methods:{
        login(){
            let url = CONSTANT.URL.ADMIN.LOGIN,
                param={
                    userName:this.account,
                    password:this.password
                }

            this.$http.post(url, param, {emulateJSON: true}).then(res => {
                let data = res.data;
                if(data.status == 200){
                    let list = data.data.bussData;
                    this.$message({
                        type: 'success',
                        message: '登录成功!'
                    });
                    this.setCookie('sessionId',list.sessionId)
                    this.$router.push('/')
                }else{
                    this.$message({
                        type: 'warning',
                        message:data.msg
                    });
                }
            }, res => {
                // error callback
            });
        },
         //设置cookie：
        setCookie(name, value){
            let Days = 1,
            exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        }
    }
}
</script>

<style scoped>
.wrap {
    height:100%;
    background: url(../../images/web_login_bg.jpg) no-repeat center;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    z-index: 999;
}

.login-wrap input[type="password"]{
    margin-bottom: 10px;
}

.login-wrap {
    position:relative;
    top:150px;
    margin: 0px auto 0 auto;
    min-height: 420px;
    max-width: 420px;
    padding: 40px;
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    /* overflow-x: hidden; */
    box-sizing: border-box;
}

.login-title {
    margin: 10px 0 0 -58px;
    padding: 18px 10px 18px 60px;
    background: #27A9E3;
    position: relative;
    color: #fff;
    font-size: 16px;
}

#darkbannerwrap {
    background: url(../../images/aiwrap.png);
    width: 18px;
    height: 10px;
    margin: 0 0 20px -58px;
    position: relative;
}

input[type=text], input[type=file], input[type=password], input[type=email], select {
    border: 1px solid #DCDEE0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #555555;
    outline: none;
    width: 90%;
    margin-bottom: 25px;
}

.login-tips {
    margin-top: 5px;
    text-align: right;
    margin-bottom: 20px;
}
.login-tips a{
    text-decoration: none;
    color: #1b66c7;
    font-size: 16px;
    cursor: pointer;
}
.login-tips a:hover{
    text-decoration:underline;
}
.login-button button{
    padding: 12px 24px;
    margin: 0px;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    width: 100%;
    cursor: pointer;
    color: #ffffff;
    background-color: #27A9E3;
    border-radius: 3px;
    border: none;
}
</style>
