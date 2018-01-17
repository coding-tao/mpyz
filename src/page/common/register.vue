<template>
    <div class="wrap">
        <div class="login-wrap">
            <div class="login-title">GlocalMe吉客猫后台-重置密码</div>
            <div id="darkbannerwrap"></div>
            <input type="text" @keyup.enter="login" v-model="userName" placeholder="昵称">
            <input type="text" @keyup.enter="login" v-model="nickname" placeholder="用户名">
            <input type="password" @keyup.enter="login"  v-model="password" placeholder="密码">
            <input type="password" @keyup.enter="login"  v-model="confirmPassword" placeholder="确认密码">
            <div class="login-tips">
                <router-link to="/rechargePassword">注册</router-link>
            </div>
            <div class="login-button">
                <button class="btn btn-primary" type="button" @click="login">确认修改</button>
            </div>
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
            userName:'',
            nickname:'',
            password:'',
            confirmPassword:'',
            empId:'',
            email:''
        }
    },
    mounted(){

    },
    methods:{
        login(){
            let url = CONSTANT.URL.ADMIN.REGISTER,
                param={
                    userName:this.userName,
                    nickname:this.nickname,
                    email:this.email,
                    empId:this.empId,
                    password:this.password,
                    confirmPassword:this.confirmPassword
                }
            
            common.requestAjax(url,param,(res)=>{
                console.log(res)
               if(res.status == 200){
                    this.$message({
                        type: 'success',
                        message: '注册成功!'
                    });
                    this.$router.push("/loginPage");
                }else{
                    this.$message({
                        type: 'warning',
                        message: res.msg
                    });
                }
            })
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
