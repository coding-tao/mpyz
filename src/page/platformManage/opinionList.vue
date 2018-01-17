<template>
    <div class="label-wrap">
        <div class="words_list_header">
            <el-button type="success" @click="deleteOption()">
                <span>批量删除</span>
            </el-button>
        </div>
        <div class="input_modal">
            <span>昵称：</span>
            <el-input v-model="nickname_like" placeholder="请输入昵称"></el-input>
            <el-button type="primary" @click="handleSearch">查询</el-button>
        </div>
        <el-table
            :data="tableData"
            border
             v-loading="loading"
             @selection-change="handleSelectionChange"
            >
            <el-table-column  fixed="left" type="selection"  min-width='100' align="center">   
            </el-table-column>
            <el-table-column
            label="昵称" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.nickname?scope.row.nickname:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="头像" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px"><img class="avatar" :src="scope.row.imgurl?scope.row.imgurl:avatar" alt=""></span>
            </template>
             </el-table-column>
            <el-table-column
            label="反馈意见内容" min-width='300' align="center" >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.content?scope.row.content:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="时间"  align="center" >
            <template slot-scope="scope">
                <span class="entryNumber"  style="margin-left: 10px">{{ scope.row.gmtCreated?formDate(scope.row.gmtCreated):'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作" min-width='100' align="center" fixed="right">
                <template slot-scope="scope">
                     <el-button @click="handleDelete(scope.row.id)" type="text" size="small" style="background: red;color: #fff;padding: 7px 14px;">删除</el-button>    
                </template>
            </el-table-column>
        </el-table>
            <el-pagination
            v-if="pageCount"
            layout="prev, pager, next"
             :current-page='pageIndex'
            :total="pageCount" @current-change="pageSizeChange">
            </el-pagination>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js'),
    common = require('../../common.js');
export default {
    data() {
        return {
            pageCount: 0,
            dialogTableVisible:false,
            labelName:'',
            formLabelWidth:'320px',
            pageIndex:1,
            loading:true,
            form: {
                name: ''
            },
            avatar:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3289761550,697278018&fm=27&gp=0.jpg',
            titleModal:'新增标签',
            id:'',
            nickname_like:'',
            tableData: [],
            deleteArr:[]
        }

    },
    mounted () {
        this.getLabelList(this.pageIndex)
    },
    methods: {
        //标签列表数据
        getLabelList(index){
            this.loading = true;
            let url = CONSTANT.URL.PLATFORM.FINDADVICEPAGE,
            param={
                pageIndex:index,
                pageSize:10,
                nickname_like:this.nickname_like
            }
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                    this.loading = false;
                    let data = res.data;
                    this.tableData = data.bussData;
                    this.pageCount = data.pageCount*10;
                }
            })
        },
        formDate(num){
            if(!num) return;
            return common.dateFormate(num);
        },
        //查找
        handleSearch(){
            this.pageIndex = 1;
            this.getLabelList(1)
        },
        // 分页
        pageSizeChange(val){
            this.pageIndex = val;
           this.getLabelList(val);
        },
        handleDelete(id){
            this.$confirm('确定删除?', '提示', {           
                confirmButtonText: '确定',           
                cancelButtonText: '取消',           
                type: 'warning'         
            }).then(() => {       
                let arr = [];
                console.log(id)
                arr.push({id:id})   
                this.deleteArr = arr;
                this.deleteOption()
            }).catch(() => {           
                this.$message({             
                    type: 'info',             
                    message: '已取消删除'           
                });                   
            });    
        },
        handleSelectionChange(val) {
            let arr = []
            val.forEach((item)=>{
                arr.push({id:item.id})
            })
            this.deleteArr = arr;
        },
        deleteOption(){
            if(!this.deleteArr.length){
                this.$message({             
                    type: 'info',             
                    message: '请选择需要删除的列表'           
                });  
                return   
            }
            let  url = CONSTANT.URL.PLATFORM.DELETEACVICE,
                param = {ids:JSON.stringify(this.deleteArr)}
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                    this.$message({
                        type: 'success',
                        message:res.msg
                    });
                    this.getLabelList(1);
                }
            }) 
        }
    }
}
</script>
<style lang="scss" scoped>
    .el-table td, .el-table th.is-leaf {
        text-align: center;
    }
    .avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .input_modal {
        margin-top: 20px;
        margin-bottom: 30px;
        span {
            display: inline-block;
        }
        .el-input {
            display: inline-block;
            width: 220px;
            margin-right: 10px;
        }
        .el-button {
            display: inline-block;
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

    .el-table_1_column_2 {
        .cell {
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
    }
    .foot{
        margin-bottom: 20px;
    }
    .add-btn{
        margin-bottom: 20px;    
    }
    .pagination {
        text-align: center;
        width: 80%;
        margin-top: 60px;
    }
    .el-pagination{
        margin-left: 35%;
        margin-top: 50px;
    }
</style>
