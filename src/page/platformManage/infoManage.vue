<template>
    <div class="container">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="关于我们" name="about">关于我们：</el-tab-pane>
            <el-tab-pane label="积分规则" name="rule">积分规则：</el-tab-pane>
        </el-tabs>
       <div class="main">
            <div id="summernote"></div>
        </div>
        <div class="btns">
            <el-button type="primary" @click="handleSave">保存</el-button>
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
            activeName:'about'
        }
    },
    mounted() {

        $('#summernote').summernote({
          lang: 'zh-CN',
          minHeight: 300, // set editor height
          focus: true,
          dialogsFade: true,
          callbacks: {
            onImageUpload: (files) => {
              let zipFormData = new FormData(),
                  id = common.getCookie('sessionId'),
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
        this.getAboutUs()
    },
    methods: {
        handleClick(tab, event) {
            if(this.activeName == 'about'){
                this.getAboutUs()
            }else{
                this.getRules()
            }
        },
        handleSave(){
            if(this.activeName == 'about'){
                this.saveAboutUs()
            }else{
                this.saveRule()
            }
        },
        saveAboutUs(){
            let url = CONSTANT.URL.PLATFORM.SAVEABOUTUS,
            param={
                content:$('#summernote').summernote('code')
            }
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                }
            })
        },
        saveRule(){
            let url = CONSTANT.URL.PLATFORM.SAVEPOINT,
            param={
                content:$('#summernote').summernote('code')
            }
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                }
            })
        },
        getAboutUs:function(event){
            let url = CONSTANT.URL.PLATFORM.GETABOUTUS,
            param={}
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                    let data = res.data;
                    $('#summernote').summernote('code', data.bussData.aboutus);
                }
            })
        },
        getRules:function(event){
            let url = CONSTANT.URL.PLATFORM.GETPOINTRULE,
            param={}
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                    let data = res.data;
                    $('#summernote').summernote('code', data.bussData.rule);
                }
            })
        },
        
    },
    
}
</script>

<style lang="scss" scoped>
@import '/static/bootstrap.css'; 
@import '/sys/static/bootstrap.css'; 
    .container {
        .el-tab-pane{
            padding: 20px 0;
        }
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
        }
        .btns {
            text-align: center;
            margin-top: 50px;
            margin-left: 11%;
        }
    }
</style>
