/**
 * Created by Eric on 2017/12/11.
 *
 * 表格组件
 *      此组件必须引用bootstrap.css\jquery\font-awesome\summernote

 *  参数说明:
 *          @param {String} upLoadUrl  图片上传接口地址
 *          @param {String} content  获取编辑器内容
 *          @param {Integer} minHeight 编辑器最低高度
 *  使用方式:
 *      ex:<bg-editor 
                :minHeight="300" 
                :uploadUrl="uploadApi" 
                :content="getApi"
                @editorData='editorInfo'>
            </bg-editor>
 *       @editorData 取得编辑器内容
 *
 *
 */
<template>
  <div>
     <div id="summernote"></div>
  </div>
</template>
<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
import $ from 'jquery'
export default {
    data(){
        return{}
    },
    props:{
        uploadUrl:String,
        minHeight:{
            type: Number,
            default: 300
        },
        content:{
            type: String,
            default: ''
        }
    },
    watch:{
        'content':function(val){
             $('#summernote').summernote('code',val);
        }
    },
    mounted() {
        $('#summernote').summernote({
          toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['picture',['picture']],
            ['table',['table']],
            ['fullscreen',['fullscreen']]
          ],
          lang: 'zh-CN',
          minHeight: this.minHeight, // set editor height
          dialogsFade: true,
          callbacks: {
            onImageUpload: (files) => {
              let zipFormData = new FormData(),
                  id = common.getCookie('admin_sessionId'),
                  url = `${this.uploadUrl}?sessionId=${id}`;
              zipFormData.append("imgFile", files[0]);
              zipFormData.append("type", 'information');
              this.$http.post(url, zipFormData).then(function (response) {
                let imgNode = response.data.url;
                $('#summernote').summernote('editor.insertImage', imgNode);
              }, function (err) {
                console.log(err)
              }).then((text) => {
                console.log(text)
              });
            },
            onChange: (contents, $editable)=> {
                this.$emit('editorData',contents)
            }
          },
          content(item) {
            
          }
        })
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
@import '/static/bootstrap.css'; 
@import '/sys/static/bootstrap.css'; 
</style>