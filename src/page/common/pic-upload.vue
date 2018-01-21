/**
 * Created by Eric on 2017/11/28.
 *
 * 表格组件
 *      此组件必须引用element-ui

 *  参数说明:
 *          @param {String} upLoadUrl  图片上传接口地址
 *          @param {Array} imageList  图片地址数组（对象键值为url）
 *          @param {Integer} limit 展示的图片最大数量
 *  使用方式:
 *      ex:<pic-upload @picData="picList" :limit="num" :picUrl="imageList" :upLoadUrl="upLoadUrl"></pic-upload>
 *       @picData 取得照片的值
 *
 *
 */
<template>
  <div>
    <el-upload
        :class="{uploadShow:uploadShow}"
        :action="upLoadUrl"   
        list-type="picture-card"
        :file-list="imageArr"
        :limit="limit?limit:1"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess">
        <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="imageUrl" alt="">
    </el-dialog>  
  </div>
</template>

<script>
  let CONSTANT = require('../../constant/constant.js'),
    common = require('../../common.js');
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        imageArr:[],
        uploadShow:false,
        imageUrl:''
      }
    },
    mounted(){
        setTimeout(()=>{
            this.imageUrl = this.picUrl
            this.getImage();
        },100)    
    },
    props: ['upLoadUrl','picUrl','limit'],
    methods: {
      getImage(){
        this.uploadShow = this.imageUrl.length>=this.limit?true:false
        this.imageArr = this.imageUrl
        console.log(this.imageUrl,this.limit,this.uploadShow,'aaa')
      },
      handleRemove(file, fileList) {
        this.imageArr.map((item,index)=>{
            if(item.url == file.url){
                this.imageArr.splice(index,1)
            }
        })
       
        this.uploadShow = false
         console.log( this.uploadShow )
      },
      handlePictureCardPreview(file) {
        this.dialogVisible = true;
        this.imageUrl = file.url
      },
      handleAvatarSuccess(res) {
            console.log(res)
            if(res.status == 200){
                let data = res.data.bussData;
                this.imageUrl =res.data.bussData.fileUrl;
                this.imageArr.push({
                    name:'name',
                    url:this.imageUrl
                })
                this.uploadShow = this.imageUrl.length>=this.limit?true:false
                this.$emit('picData',data)
            }
       },
    }
  }

</script>

<style lang="scss">
  .uploadShow  { .el-upload{display: none;}}

    input.el-upload__input { display: none;}

</style>
