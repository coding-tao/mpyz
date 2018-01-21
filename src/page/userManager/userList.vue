<template>
    <div class="container">
        <el-row class="wrap-search">
            <div class="search-item">
                <div class="search-title">用户昵称：</div>
                <el-input style="width: 200px;" class=""
                placeholder="请输入用户昵称"
                v-model="configList.param.nickname_like" ></el-input>
            </div>
            <el-button  class="search-btn" type="primary" @click="getList()">查询</el-button>
        </el-row>
        <div class="">
            <table-list ref="tableList" :tableConfig='configList'>
                <el-table-column  slot="avatar"  align="center" min-width="100" label="头像">
                      <template slot-scope="scope">
                          <span v-if="scope.row.avatarUrl == ''"> -- </span>
                          <span v-else style="margin-left: 10px"><img class="avatar" :src="scope.row.avatarUrl" alt=""></span>
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
                url:CONSTANT.URL.USER.USERLIST,
                configList:[
                    {  
                      slot:'avatar'
                    },
                    {
                       label:'用户昵称',
                       prop:'nickName'
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
        .avatar{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }
</style>
