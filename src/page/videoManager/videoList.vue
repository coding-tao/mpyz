<template>
    <div class="container">
        <el-row class="wrap-search">
            <div class="search-item">
                <div class="search-title">发布用户：</div>
                <el-input style="width: 200px;" class=""
                placeholder="请输入发布用户"
                v-model="configList.param.nickname_like" ></el-input>
            </div>
            <el-button  class="search-btn" type="primary" @click="getList()">查询</el-button>
        </el-row>
        <div class="">
            <table-list ref="tableList" :tableConfig='configList'>
                  <el-table-column  slot="image"  align="center" label="视频封面">
                      <template slot-scope="scope">
                          <img :src="scope.row.infos[1].fileUrl" alt="">
                      </template>
                  </el-table-column>
                   <el-table-column  slot="video"  align="center" label="视频">
                      <template slot-scope="scope">
                          <video  controls="controls" :src="scope.row.infos[0].fileUrl" alt=""></video>
                      </template>
                  </el-table-column>
                  <el-table-column class="btn" label="操作" slot="btn" align="center" >
                    <template slot-scope="scope">
                        <el-button  class="search-btn" size="small" type="danger" @click="delLevel(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
            </table-list>
        </div>+
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
export default {
    data() {
        return { 
            configList:{
                url:CONSTANT.URL.INFO.FINDINFOPAGE,
                configList:[
                    {  
                      slot:'image'
                    },
                    {  
                      slot:'video'
                    },
                    {
                       label:'内容',
                       prop:'msgContent'
                    },
                    {
                       label:'发布用户',
                       prop:'name'
                    },
                    {
                       label:'时间',
                       prop:'createTime'
                    },
                    {
                      slot:'btn'
                    }
                ],
                param:{
                    nickname_like:''
                },
                type:'',
                width:'',
                isPagination:true
            }
        }
    },
    components: {
        'table-list':() => import('../common/my-table')
    },  
    mounted() {

    },
    methods: {
        getList(){
            this.$refs.tableList.getList()
        },
        delLevel(){
            this.$confirm('确定删除?', '提示', {           
                confirmButtonText: '确定',           
                cancelButtonText: '取消',           
                type: 'warning'         
            }).then(() => {           
                let  url = CONSTANT.URL.GOOD.DELETEGOODS,
                    param = {id:id}
                common.requestAjax(url,param,(res)=>{
                    if(res.status == 200){
                        this.$message({
                            type: 'success',
                            message:res.msg
                        });
                        this.getList();
                    }else{
                        this.$message({           
                            message: res.msg,           
                            type: 'warning'         
                        });
                    }
                }) 
   
            }).catch(() => {           
                this.$message({             
                    type: 'info',             
                    message: '已取消删除'           
                });                   
            });   
        }
    }
}
</script>

<style lang="scss">
    .container {
        .wrap-search{
            margin-bottom: 20px;
            .search-item{
                float: left;
                margin-right: 20px;
                margin-top: 20px;
            }
            button{
                float: left;
                margin-top: 20px;
            }
            .search-title{
                display: inline;
                width: 100px;
                height: 36px;
                line-height: 36px;
                text-align: right;
                margin-bottom: 20px;
                margin-right: 10px;
            }
        }
        .el-table__row{

            video{
                width: 100px;height: auto;
            }
            img{
                width: 100px;height: auto;
            }
        }
        .pagination {
            text-align: center;
            width: 80%;
            margin-top: 60px;
        }
    }
</style>
