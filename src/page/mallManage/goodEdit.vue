<template>
    <div class="container">
        <div class="header">
           <p>新增/编辑商品信息</p>
           <el-button  class="link" type="info">
                <router-link to="/goodsList" style="color: #fff;">返回</router-link>
           </el-button>
       </div>
       <div class="main">
            <div class="title">
                <span><i>*</i>商品名称：</span>
                <el-input v-model="goodsName" placeholder="请输入内容" class="input-text" :maxlength='20'></el-input>
            </div>
            <div class="cover">
                <span><i>*</i>商品图片：</span>
                <el-upload class="avatar-uploader" 
                    :action="upLoadUrl"   
                    :show-file-list="false"   
                    :on-success="handleAvatarSuccess"   
                    >   
                    <img v-if="imgUrl" :src="imgUrl" class="avatar">   
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i> 
                </el-upload>
            </div>
            
            <div class="title">
                <span><i>*</i>商品类型：</span>
                <el-select   placeholder='-请选择-'  v-model="goodsTypeName" @change="getGoodsType">
                    <el-option   v-for="item in goodsList"   :key="item.value"   :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="title">
                <span><i>*</i>所需吉分：</span>
                <el-input v-model="points" placeholder="请输入内容" class="input-text" @change="typeLimit" :maxlength='6'></el-input>
            </div>
            <div class="title">
                <span><i>*</i>总数：</span>
                <el-input v-model="exchangeLimit" placeholder="请输入内容" class="input-text" @change="typeLimit" :maxlength='5'></el-input>
            </div>
            <div class="btns">
                <el-button type="primary" @click="handleSave">确定</el-button>
                <el-button  class="link" type="info">
                    <router-link to="/goodsList" style="color: #fff;padding:12px 20px;">返回</router-link>
                </el-button>
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
            upLoadUrl:'',
            id:'',
            goodsName:'',
            points:'',
            exchangeLimit:'',
            goodsType:'',
            goodsTypeName:'',
            goodsTypeCode:0,
            goodsList:[
                {value:'15301',label:'实物商品'},
                {value:'15302',label:'虚拟商品'},
            ],
            imgUrl:'',
            fileUrl:''
        }
    },
    mounted() {
        this.id = this.$router.currentRoute.query.id;
       // console.log(this.id);
        let sessionId = common.getCookie('sessionId');
        this.upLoadUrl = 'https://glocalme.icebartech.com/api/admin/sys/uploadFile?sessionId='+sessionId;
        this.getGoodsById();

    },
    methods: {
        getGoodsById:function(){  
            if(this.id){
                let url = CONSTANT.URL.GOOD.GETGOODSDETAIL,
                param={id:this.id}
                common.requestAjax(url,param,(res)=>{
                    if(res.status == 200){
                        let data = res.data.bussData;
                        this.id = data.id;
                        this.goodsName = data.goodsName;
                        this.goodsType = data.goodsType;
                        if(this.goodsType == '15301'){
                            this.goodsTypeName = '实物商品'
                        }
                        else if(this.goodsType == '15302'){
                            this.goodsTypeName = '虚拟商品'
                        }
                        this.points = data.points;
                        this.exchangeLimit = data.exchangeLimit;
                        this.imgUrl = data.imageUrl;
                        this.fileUrl = data.fileUrl;
                    }
                })
            }
        },
        getGoodsType(val){
            this.goodsTypeCode++;
            if(this.id){
                if(this.goodsTypeCode >1){
                    this.goodsType = val;
                }
            }
            else{
                this.goodsType = val;
            }
            this.goodsType = val;
            console.log(this.goodsType);
            
        },
        handleAvatarSuccess(res, file) {
            this.imgUrl = URL.createObjectURL(file.raw);
            console.log(res);
            if(res.status == 200){
                let data = res.data.bussData;
                this.fileUrl = data.fileUrl;
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleSave(){
            if(!this.paraLimit(this.goodsName,0)) { return false;}
            else if(!this.paraLimit(this.suffix,1)) { return false;}
            else if(!this.paraLimit(this.goodsType,2)) { return false;}
            else if(!this.paraLimit(this.points,3)) { return false;}
            else if(!this.paraLimit(this.exchangeLimit,4)) { return false;}
            if(this.points<0){
                this.$message({           
                    message: '所需吉分不能小于零！',           
                    type: 'warning'         
                });
                return false;
            }
            let url = CONSTANT.URL.GOOD.SAVEGOODS;
            let param = {
                    id:this.id?this.id:'',
                    goodsName:this.goodsName,
                    goodsType:this.goodsType,
                    points:this.points,
                    exchangeLimit:this.exchangeLimit,
                    fileUrl:this.fileUrl
                };
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    this.$router.push("/goodsList");
                }else{
                    this.$message({           
                        message: res.msg,           
                        type: 'warning'         
                    });
                }
            })
        },
        typeLimit:function(e){
            if(isNaN(e)){
                this.$message({           
                    message: '输入类型只能为数字哦~~',           
                    type: 'warning'         
                });
            }
        },
        paraLimit(value,index){
            let tips = [
                '商品名称不能为空!',
                '请上传商品图片!',
                '请选择商品类型!',
                '所需吉分不能为空!',
                '总数不能为空!'
            ];
            
            if(value == ''){
                this.$message({
                    type: 'warning',
                    message: tips[index]
                }); 
                return false;
            }
            else{
                if(index == 3){
                    if(isNaN(value)){
                        this.$message({           
                            message: '所需吉分只能是数字类型哦~~',           
                            type: 'warning'         
                        });
                        return false;
                    }
                    else{
                        return true;
                    }
                }
                else if(index == 4){
                    if(isNaN(value)){
                        this.$message({           
                            message: '总数只能是数字类型哦~~',           
                            type: 'warning'         
                        });
                        return false;
                    }
                    else{
                        return true;
                    }
                }
                else{
                    return true;
                }
            }
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
                        .el-upload__input{
                            display: none !important;
                        }
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
            .btns {
                text-align: left;
                margin-top: 40px;
                margin-left: 11%;
            }
        }
    }
</style>
