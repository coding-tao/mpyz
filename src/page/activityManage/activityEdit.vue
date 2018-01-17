<template>
    <div class="container">
        <div class="header">
           <p>新增/编辑活动</p>
       </div>
       <div class="main">
            <div class="title">
                <span><i>*</i>活动标题：</span>
                <el-input v-model="title" placeholder="请输入内容" class="input-text" :maxlength='40'></el-input>
            </div>
            <div class="cover">
                <span><i>*</i>封面：</span>
                <el-upload class="avatar-uploader" 
                    :action="upLoadUrl"   
                    :show-file-list="false"   
                    :on-success="handleAvatarSuccess"   
                    >   
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">   
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i> 
                </el-upload>
            </div>
            <div class="content-edit">
                <p class="edit-title">*活动详情:</p>
                <div id="summernote"></div>
            </div>
            <div class="btns">
                <el-button size="small" type="primary" @click="handleSave">确定</el-button>
                <el-button size="mini"  class="link" type="info">
                    <router-link to="/activityList" style="color: #fff;">返回</router-link>
                </el-button>
            </div>
        </div>
       

    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
import $ from 'jquery'
export default {
    data() {
        return {
            upLoadUrl:'',
            skuId:'',
            content:'',
            file:'',
            imageUrl:'',
            title:''
        }
    },
    mounted() {
        let id = this.getCookie('sessionId');
        this.skuId = this.$router.currentRoute.query.id;
        this.upLoadUrl = `${CONSTANT.URL.SYS.UPLOADFILE}?sessionId=${id}`;
        this.getProById();
        this.summernoteConfig()
    },
    methods: {
        summernoteConfig(){
            $('#summernote').summernote({
            lang: 'zh-CN',
            minHeight: 300, // set editor height
            focus: true,
            dialogsFade: true,
            callbacks: {
                onImageUpload: (files) => {
                let zipFormData = new FormData(),
                    id = this.getCookie('sessionId'),
                    url = `${CONSTANT.URL.SYS.UPLOADFILE}?sessionId=${id}`;
                zipFormData.append("file", files[0]);
                this.$http.post(url, zipFormData).then(function (response) {
                    let imgNode = response.data.data.bussData.fileUrl;
                    $('#summernote').summernote('editor.insertImage', imgNode);
                }, function (err) {
                    console.log(err)
                }).then((text) => {
                    console.log(text)
                });
                }
            },
            content(item) {
                // console.log(item)
            }
            })
        },
         getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");　　
            return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
        },

        getProById:function(){  
            if(this.skuId){
                let url = CONSTANT.URL.ACTIVITY.FINDACTIVITY,
                param={id:this.skuId}
                common.requestAjax(url,param,(res)=>{
                    if(res.status == 200){
                        let data = res.data.bussData;
                        this.title = data.title;
                        this.imageUrl = data.imageUrl
                        $('#summernote').summernote('code', data.content);
                    }
                })
            }
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(this.imageUrl);
            if(res.status == 200){
                let data = res.data.bussData;
                this.file = data;
            }
        },
        handleSave:function(){
            if(!this.title){this.formTip(0);return}
            if(!this.file.fileUrl&&!this.imageUrl){this.formTip(1);return}
            if(!$('#summernote').summernote('code')||$('#summernote').summernote('code') == '<p><br></p>'){this.formTip(2);return}
            let url = CONSTANT.URL.ACTIVITY.SAVEACTIVITY;
            let param = {
                    id:this.skuId?this.skuId:'',
                    title:this.title,
                    content:$('#summernote').summernote('code'),
                    fileUrl:this.file.fileUrl
                };
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    this.$router.push("/activityList");
                }
            })
        },
        formTip:function(index){
             
                let tipArr = [
                    '活动标题不能为空！',
                    '封面不能为空！',
                    '活动详情不能为空！'
                ]
                this.$message({           
                    message: tipArr[index],           
                    type: 'warning'         
                });
                console.log(tipArr[index],'fffffffffff');
        },
        typeLimit:function(e){
            console.log(e);
            if(isNaN(e)){
                this.$message({           
                    message: '输入类型只能为数字哦~~',           
                    type: 'warning'         
                });
                e = '';
            }
        }
        
    },
    
}
</script>

<style lang="scss" scoped>
@import '/static/bootstrap.css';     
@import '/sys/static/bootstrap.css'; 
    .container {
        .header{
            height: 36px;
            padding-bottom: 10px;
            border-bottom: 1px solid #dedede;
            p{ float: left;height: 36px;line-height: 36px;margin: 0 0 0 10px;font-size: 18px;}
            .el-button{
                float: right ;
            }
        }
        .main {
            width:99%;
            margin: 20px auto;
            clear: both;
            .title {
                margin-top: 20px;
                span {
                    width: 10%;
                    display: inline-block;
                    i{ color: red;}
                }
                .input-text {
                    width: 35%;
                }
               // .el-select{ width: 50%;}
               .pro-comments{ height: 96px;}
            }
            .cover {
                margin-top: 20px;
                span {
                    width: 10%;
                    float: left;
                    i{ color: red;}
                }
                .avatar-uploader {
                     .el-upload {
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                        .avatar-uploader-icon {
                            font-size: 28px;
                            color: #8c939d;
                            width: 178px;
                            height: 178px;
                            line-height: 178px;
                            text-align: center;
                            border: 1px dashed #d9d9d9 !important;
                            border-radius: 6px;
                            margin-left: 6px;
                        }
                        .avatar {
                            width: 178px;
                            height: 178px;
                            display: block;
                        }
                    }
                    .el-upload:hover {
                        border-color: #20a0ff;
                    }
                    
                }
                
            }

            .content-edit{
                margin-top: 20px;
                .edit-title{
                    margin-bottom: 20px;
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
