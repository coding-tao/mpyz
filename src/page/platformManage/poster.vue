<template>
    <div class="container">
        <div class="header">
           <p>排行榜海报</p>
       </div>
       <div class="main">
            <div class="cover">
                <pic-upload @picData="picList" :limit="num" :picUrl="imageList" :upLoadUrl="upLoadUrl"></pic-upload>
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
            imageList:[],
            dialogImageUrl: '',
            dialogVisible: false,
            imageArr:[],
            num:1
        }
    },
    created() {
        this.getPoster()
        let id = common.getCookie('sessionId');
        this.upLoadUrl = `${CONSTANT.URL.SYS.UPLOADFILE}?sessionId=${id}`;
    },
    components:{
        'pic-upload':() => import('../common/pic-upload'),
    }, 
    methods: {
      picList(val){
          console.log(val)
         this.savePoster(val)
      },
      getPoster(){
        let url = CONSTANT.URL.PLATFORM.GETRANKING,
        param={}
        common.requestAjax(url,param,(res)=>{
            if(res.status == 200){
                let data = res.data;
                this.imageList.push({'url':data.bussData.url});
            }
        })
      },
      savePoster(obj){
            let url = CONSTANT.URL.PLATFORM.SAVEBANNER,
            arr = [];
            arr.push({
                fileUrl:obj.fileUrl,
                url:'',
                type:'ranking'
            })
            let param={imgJson:JSON.stringify(arr)}
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                    this.loading = false;
                    let data = res.data;
                    this.tableData = data.bussData;
                    this.pageCount = data.pageCount*10;
                }
            })                
      }
        
    },
    
}
</script>

<style lang="scss">
    .container {
        width: 90%;
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
                .input-text {
                    width: 35%;
                }
               .pro-comments{ height: 96px;}
            }
            .cover {
                margin-top: 20px;

                    input.el-upload__input { display: none;}
                    
            }



            .btns {
                text-align: left;
                margin-top: 40px;
                margin-left: 11%;
            }
        }
    }
</style>
