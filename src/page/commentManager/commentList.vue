<template>
    <div class="container">
        <el-row class="wrap-search">
            <div class="search-item">
                <div class="search-title">评论用户：</div>
                <el-input style="width: 200px;" class=""
                placeholder="请输入评论用户"
                v-model="configList.param.nickname_like" ></el-input>
            </div>
            <div class="search-item">
                <div class="search-title">视频发布用户：</div>
                <el-input style="width: 200px;" class=""
                placeholder="请输入视频发布用户"
                v-model="configList.param.nickname_like" ></el-input>
            </div>            
            <el-button  class="search-btn" type="primary" @click="getList()">查询</el-button>
        </el-row>
        <div class="">
            <table-list ref="tableList" :tableConfig='configList'>
                  <el-table-column  slot="image"  align="center" min-width="100" label="头像">
                      <template slot-scope="scope">
                          <span v-if="scope.row.avatarUrl == ''"> -- </span>
                          <span v-else style="margin-left: 10px"><img class="avatar" :src="scope.row.avatarUrl" alt=""></span>
                      </template>
                  </el-table-column>
                   <el-table-column  slot="video"  align="center" min-width="100" label="头像">
                      <template slot-scope="scope">
                          <span v-if="scope.row.avatarUrl == ''"> -- </span>
                          <span v-else style="margin-left: 10px"><img class="avatar" :src="scope.row.avatarUrl" alt=""></span>
                      </template>
                  </el-table-column>
                  <el-table-column class="btn" label="操作" slot="btn"  min-width="200" align="center" fixed="right" >
                    <template slot-scope="scope">
                        <el-button  class="search-btn" size="small" type="danger" @click="delLevel(scope.row.msgId)">删除</el-button>
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
                url:CONSTANT.URL.INFO.FINDREPLYPAGE,
                configList:[
                    {  
                      slot:'image'
                    },
                    {
                       label:'发布视频用户',
                       prop:'name'
                    },
                    {
                       label:'评论内容',
                       prop:'replyInfo'
                    },
                    {
                       label:'评论用户',
                       prop:'nickName'
                    },
                    {
                       label:'时间',
                       prop:'nickName'
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
                let  url = CONSTANT.URL.INFO.DELETEREPLY,
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
        .pagination {
            text-align: center;
            width: 80%;
            margin-top: 60px;
        }
    }
</style>
