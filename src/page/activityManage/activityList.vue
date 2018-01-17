<template>
    <div class="label-wrap">
        <div class="words_list_header">
            <el-button class="link" type="primary">
                <router-link :to="{ name: 'activityEdit', params: {}}">新增活动</router-link>
            </el-button>
        </div>
        <el-table
            :data="tableData"
            border
            >
            <el-table-column
            label="活动名称" min-width='100' align="center" >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title?scope.row.title:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="创建时间" min-width='100' align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.gmtCreated?formDate(scope.row.gmtCreated):'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                   <el-button  class="link" type="text"  style="background: #4db3ff;color: #fff;">
                     <router-link :to="{ path: 'activityEdit', query: {id: tableData[scope.$index].id} }" style="color: #fff;padding: 7px 9px;">编辑</router-link>
                   </el-button>
                   <el-button @click="handleDelete(scope.row.id)" type="text"  style="background: red;color: #fff;padding: 7px 9px;">删除</el-button>          
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
            v-if="pageCount"
             :current-page='pageIndex'
            layout="prev, pager, next"
            :total="pageCount" @current-change="pageSizeChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js'),
    common = require('../../common.js');
export default {
    data() {
        return {
            pageCount: '',
            pageIndex:1,
            nickname_like:'',
            sexArr:['未知','男','女'],
            tableData: [],
            avatar:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3289761550,697278018&fm=27&gp=0.jpg',
            options: [{
                value: '全部',
                label: ''
            }, {
                value: '已认证',
                label: 'y'
            }, {
                value: '未认证',
                label: 'n'
            }],
            value:''
        }
    },
    mounted(){
        this.userListInfo();
    },
    methods: {
        userListInfo(){
            let url = CONSTANT.URL.ACTIVITY.ACTIVITYPAGE,
            param={
                nickname_like:this.nickname_like,
                pageIndex:this.pageIndex,
                pageSize:10
            };

            common.requestAjax(url,param,(res)=>{
                let data = res.data;
                this.tableData = data.bussData;
                this.pageCount = data.pageCount*10;
            })
        },
        formDate(num){
            return common.dateFormate(num);
        },
        search(){
            this.pageIndex = 1;
            this.userListInfo();
        },
        handleDelete(id){
            this.$confirm('确定删除?', '提示', {           
                confirmButtonText: '确定',           
                cancelButtonText: '取消',           
                type: 'warning'         
            }).then(() => {           
                let  url = CONSTANT.URL.ACTIVITY.DELETEACTIVITY,
                     param = {id:id}
                    common.requestAjax(url,param,(res)=>{
                        if(res.status == 200){
                            this.$message({
                                type: 'success',
                                message:res.msg
                            });
                            this.userListInfo();
                        }
                    }) 
            }).catch(() => {           
                this.$message({             
                    type: 'info',             
                    message: '已取消删除'           
                });                   
            });    
        },
        pageSizeChange(val){
            this.pageIndex = val;
            this.userListInfo();
        }
    }
}
</script>
<style lang="scss" scoped>
    .el-table td, .el-table th.is-leaf {
        text-align: center;
    }
    .el-input__inner{
        width: 200px;
    }
    .cell {
            text-align: left;
            span{
                margin-left: 0px;
            }
        }
    .words_list_header {
        padding-bottom: 15px;
        border-bottom: 1px solid #d0d0d0;
        .el-button {
            a {
                color: #fff;
            }
        }
    }

    .cell {
        text-align: center;
        img {
            width: 100px;
            padding-top: 10px;
        }
    }

    .wrap-search{
        margin-bottom: 20px;
        margin-top: 20px;
        .search-title{
            display: inline;
            width: 100px;
            height: 36px;
            line-height: 36px;
            text-align: right;
            margin-bottom: 20px;
            margin-right: 10px;
        }
        button{
            margin-left: 20px;
        }
    }

    .pagination {
        text-align: center;
        width: 80%;
        margin-top: 60px;
    }
    .foot{
        padding-bottom: 30px;
    }
    .exchangeName{
        color: #50bfff;
        cursor: pointer;
    }
    .btn-wrap{
        margin-top: 5px;
        margin-bottom: 5px;
    }
</style>
