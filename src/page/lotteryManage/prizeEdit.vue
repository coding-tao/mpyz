<template>
    <div class="container">
        <div class="header">
           <p>新增/编辑奖品信息</p>
           <el-button  class="link" type="info">
                <router-link to="/prizeList" style="color: #fff;">返回</router-link>
           </el-button>
       </div>
       <div class="main">
            <div class="title">
                <span><i>*</i>奖品名称：</span>
                <el-input v-if="!this.id" v-model="giftName" placeholder="请输入内容" class="input-text" :maxlength='20'></el-input>
                <span v-if="this.id">{{giftName}}</span>
            </div>
            <div class="cover">
                <span><i>*</i>奖品图片：</span>
                <el-upload class="avatar-uploader" 
                    :action="upLoadUrl"   
                    :show-file-list="false"   
                    :on-success="handleAvatarSuccess"   
                    >   
                    <img v-if="imgUrl" :src="imgUrl" class="avatar">   
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i> 
                </el-upload>
                <!-- <div class="" style="margin-left: 10%;margin-top: 10px;color: red;">图片建议尺寸：230像素 * 190像素</div> -->
            </div>
            
            <div class="title" v-if="giftName != '谢谢参与'">
                <span><i>*</i>奖品类型：</span>
                <el-select  filterable  placeholder='-请选择-'  v-model="giftTypeName"   @change="getGiftType">
                    <el-option   v-for="item in giftList"   :key="item.value"   :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="title" v-if="giftName != '谢谢参与'">
                <span><i>*</i>奖品数量：</span>
                <el-input v-model="exchangeLimit" placeholder="请输入奖品数量" class="input-text" @change="typeLimit" :maxlength='6'></el-input>
            </div>
            <div class="title">
                <span><i>*</i>中奖概率(%)：</span>
                <span v-if="giftName == '谢谢参与'">{{percentage}}</span>
                <el-input v-if="giftName != '谢谢参与'" v-model="percentage" placeholder="请输入中奖概率" class="input-text" @change="typeLimit" :maxlength='8'></el-input>
            </div>
            <div class="title" v-if="giftType == '1000007'">
                <span><i>*</i>吉分数：</span>
                <el-input  v-model="point" placeholder="请输入吉分数" class="input-text" @change="typeLimit" :maxlength='6'></el-input>
            </div>
            <div class="btns">
                <el-button type="primary"  @click="handleSave">确定</el-button>
                <el-button  class="link" type="info">
                    <router-link to="/prizeList" style="color: #fff;padding:12px 20px;">返回</router-link>
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
            giftName:'',
            percentage:'',
            exchangeLimit:'',
            giftType:'',
            giftTypeName:'',
            giftTypeCode:0,
            giftList:[
                {value:'1000005',label:'实物奖品'},
                {value:'1000006',label:'虚拟奖品'},
                {value:'1000007',label:'吉分'}
            ],
            imgUrl:'',
            fileUrl:'',
            point:''
        }
    },
    mounted() {
        this.id = this.$router.currentRoute.query.id;
       // console.log(this.id);
        let sessionId = common.getCookie('sessionId');
        this.upLoadUrl = 'https://glocalme.icebartech.com/api/admin/sys/uploadFile?sessionId='+sessionId;
        this.getGiftById();
    },
    methods: {
        getGiftById(){  
            if(this.id){
                let url = CONSTANT.URL.GIFT.GETGIFTBYID,
                param={id:this.id}
                common.requestAjax(url,param,(res)=>{
                    if(res.status == 200){
                        let data = res.data.bussData;
                        this.id = data.id;
                        this.giftName = data.giftName;
                        this.giftType = data.giftType;
                        if(this.giftType == '1000005'){
                            this.giftTypeName = '实物奖品'
                        }
                        else if(this.giftType == '1000006'){
                            this.giftTypeName = '虚拟奖品'
                        }else if(this.giftType == '1000007'){
                            this.giftTypeName = '吉分'
                        }
                        this.percentage = String(data.percentage);
                        this.exchangeLimit = data.exchangeLimit;
                        this.imgUrl = data.imageUrl;
                        this.fileUrl = data.fileUrl;
                        this.point = data.point;
                    }
                })
            }
        },
        getGiftType(val){
            this.giftType = val;      
        },
        handleAvatarSuccess(res, file) {
            this.imgUrl = URL.createObjectURL(file.raw);
            console.log(res);
            if(res.status == 200){
                let data = res.data.bussData;
                this.fileUrl = data.fileUrl;
            }
        },
        handleSave(){
            
            if(!this.paraLimit(this.giftName,0)) { return false;}
            else if(!this.paraLimit(this.suffix,1)) { return false;}
            else if(!this.paraLimit(this.giftType,2)) { return false;}
            else if(!this.paraLimit(this.exchangeLimit,3)) { return false;}
            else if(!this.paraLimit(this.percentage,4)) { return false;}
           
            if(this.percentage.includes('.')){
                if(this.percentage.split('.')[1].length>2){
                    this.$message({
                        type: 'warning',
                        message: '中奖概率只能保留两位小数'
                    }); 
                    return       
                }
            }
            if(this.giftType == '1000007'){
                if(!this.paraLimit(this.point,5)){
                    return;
                }
            }
            let url = CONSTANT.URL.GIFT.SAVEGIFT;
            let param = {
                    id:this.id?this.id:'',
                    giftName:this.giftName,
                    giftType:this.giftType,
                    percentage:this.percentage,
                    exchangeLimit:this.exchangeLimit,
                    url:this.fileUrl,
                    point:this.point
                };
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    this.$router.push("/prizeList");
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
                '奖品名称不能为空!',
                '请上传奖品图片!',
                '请选择奖品类型!',
                '奖品数量不能为空!',
                '中奖概率不能为空!',
                '吉分数不能为空!'
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
                            message: '奖品只能是数字类型哦~~',           
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
                            message: '中奖概率只能是数字类型哦~~',           
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
                    width: 11%;
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
                    width: 11%;
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
            .btns {
                text-align: left;
                margin-top: 40px;
                margin-left: 11%;
            }
        }
    }
</style>
