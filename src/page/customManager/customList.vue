<template>
    <div class="container">
        <div class="header">
           <p>客服联系方式设置</p>
       </div>
       <div class="main">
            <div class="title">
                <span><i>*</i>联系电话：</span>
                <el-input v-model="mobile" placeholder="请输入联系电话" class="input-text" :maxlength='20'></el-input>
            </div> 
            <div class="title">
                <span><i>*</i>QQ号：</span>
                <el-input v-model="qqNumber" placeholder="请输入QQ号" class="input-text" :maxlength='20'></el-input>
            </div> 
            <div class="title">
                <span><i>*</i>微信号：</span>
                <el-input v-model="wechatNum" placeholder="请输入微信号" class="input-text" :maxlength='20'></el-input>
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
            infoList:[],
            mobile:'',
            qqNumber:'',
            wechatNum:''
        }
    },
    mounted() {
        this.getInfo()
    },
    methods: {
        getInfo(){
            let url = CONSTANT.URL.COMMON.FINDCONCAT,
            param={};
            common.requestAjax(url,param,(res)=>{
                let infoList = res.data.bussData;
                this.infoList = infoList;
                this.mobile = infoList[0].value;
                this.qqNumber = infoList[1].value;
                this.wechatNum = infoList[2].value;
            })
        },
        handleSave(){
            let infoList = this.infoList;
            let arr = [
                {
                id:infoList[0].id,
                value:this.mobile
                },
                {
                    id:infoList[1].id,
                    value:this.qqNumber
                },
                {
                    id:infoList[2].id,
                    value:this.wechatNum
                },
            ]
            let url = CONSTANT.URL.COMMON.UPDATECONCAT,
            param={
                customerServiceContactJson:JSON.stringify(arr)
            };
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                }
            })
        }
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
