
<template>
    <div class="container">
        <div class="header">
           <p>修改密码</p>
       </div>
       <div class="main">
            <div class="cover">
             <el-input v-model="oldPWD" placeholder="请输入旧密码" class="input-text"></el-input>
             <el-input v-model="newPWD" type="password" placeholder="请输入6-18位新密码" class="input-text"></el-input>
             <el-input v-model="confirmNewPWD" type="password" placeholder="请再次输入6-18位新密码" class="input-text"></el-input>
            </div>
        </div>
        <div class="btns">
            <el-button type="primary" @click="login">确定</el-button>
            <el-button  class="link" type="info">
                <router-link to="/" style="color: #fff;">返回</router-link>
            </el-button>
        </div>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
export default {
    name: 'login',
    data() {
        return {
            oldPWD:'',
            newPWD:'',
            confirmNewPWD:''
        }
    },
    mounted(){

    },
    methods:{
        login(){
            if(!this.oldPWD){
                this.$message({
                    type: 'warning',
                    message:'旧密码不能为空！'
                });
                return false;
            }
            if(!this.newPWD){
                this.$message({
                    type: 'warning',
                    message:'新密码不能为空！'
                });
                return false;
            }
            if(!this.confirmNewPWD){
                this.$message({
                    type: 'warning',
                    message:'确认密码不能为空！'
                });
                return false;
            }     

            if(this.newPWD != this.confirmNewPWD){
                this.$message({
                    type: 'warning',
                    message:'新密码和确认密码不一样！'
                });
                return false;
            }                   
            console.log(this.newPWD)
            let url = CONSTANT.URL.ADMIN.MODIFYPWD,
                param={
                    oldPWD:this.oldPWD,
                    newPWD:this.newPWD,
                    confirmNewPWD:this.confirmNewPWD
                }
            
            common.requestAjax(url,param,(res)=>{
                console.log(res)
               if(res.status == 200){
                    this.$message({
                        type: 'success',
                        message: '密码修改成功!'
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

<style lang="scss" scoped>
    .container {
        width: 90%;
        .header{
            height: 36px;
            padding-bottom: 10px;
            margin-bottom: 20px;
            border-bottom: 1px solid #dedede;
            p{ float: left;height: 36px;line-height: 36px;margin: 0 0 0 10px;font-size: 18px;}
            .el-button{
                float: right ;
            }
        }
        .main {
            clear: both;
            .el-input, .el-input__inner {
                width: 50%;
                margin-bottom: 20px;
            }
        }
    }
</style>
