<template>
    <div class="container">
        <div class="header">
           <p>客服联系方式设置</p>
       </div>
       <div class="main">
            <div class="title">
                <span><i>*</i>联系电话：</span>
                <el-input v-model="goodsName" placeholder="请输入联系电话" class="input-text" :maxlength='20'></el-input>
            </div> 
            <div class="title">
                <span><i>*</i>QQ号：</span>
                <el-input v-model="goodsName" placeholder="请输入QQ号" class="input-text" :maxlength='20'></el-input>
            </div> 
            <div class="title">
                <span><i>*</i>微信号：</span>
                <el-input v-model="goodsName" placeholder="请输入微信号" class="input-text" :maxlength='20'></el-input>
            </div> 
            <div class="btns">
                <el-button type="primary" @click="handleSave">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
export default {
    data() {
        return {
            goodsName:'',
        }
    },
    mounted() {

    },
    methods: {
        
    },
    
}
</script>

<style lang="scss" scoped>
    .container {
        .header{
            height: 46px;
            padding-bottom: 10px;
            border-bottom: 1px solid #dedede;
            p{ float: left;height: 36px;line-height: 36px;margin: 0 0 0 10px;font-size: 18px;}
            .el-button{
                float: right ;
            }
        }
        .main {
            width:80%;
            margin: 20px auto;
            clear: both;
            .title {
                margin-top: 50px;
                span {
                    width: 10%;
                    display: inline-block;
                    i{ color: red;}
                }
                .input-text {
                    width: 35%;
                }
            }
            .btns {
                text-align: left;
                margin-top: 40px;
                margin-left: 11%;
            }
        }
    }
</style>
