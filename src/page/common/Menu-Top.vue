<template>
    <header>
        <el-col :span="21" :push="3">GlocalMe吉客猫后台</el-col>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <img alt="Avatar" src="../../images/avatar2.jpg">
                <p>管理员</p>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">重置密码</el-dropdown-item>
                <el-dropdown-item command="1">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </header>
</template>

<script>
let CONSTANT = require('../../constant/constant.js'),
    common = require('../../common.js');
export default {
    data () {
        return {
            menuShow:false
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        handleCommand(command){
            console.log(command)
            if(command == '1'){
                let url = CONSTANT.URL.ADMIN.LOGOUT,
                param={};
                common.requestAjax(url,param,(res)=>{
                })
                this.$router.push("/loginPage");
            }else{
                this.$router.push("/rechargePassword");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    header{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        display: flex;
        -webkit-display: flex;
        align-items: center;
        -webkit-align-items: center;
        background-color: rgb(32, 160, 255);
        color: #fff;
        z-index: 100;
        font-size: 25px;
        font-weight: 700;
    }

    .el-dropdown{
    }

    .el-dropdown-link{
        display: flex;
        -webkit-display: flex;
        align-items: center;
        -webkit-align-items: center;
        cursor: pointer;
        span{
            color: #fff;
        }
        P{
            color: #fff;
        }

        img{
            position: relative;
            margin-right: 10px;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            -webkit-border-radius: 50%; 
        }
    }
</style>
