<template>
    <div class="label-wrap">
        <div class="input_modal">
            <span>昵称：</span>
            <el-input v-model="nicknameLike" placeholder="请输入昵称"></el-input>
            <el-button type="primary" @click="getScoreList(1)">查询</el-button>
        </div>
        <el-table
            :data="tableData"
            v-loading="loading"
            border
            >
            <el-table-column
            label="昵称" >
            <template slot-scope="scope"  min-width='100' align="center">
                <span style="margin-left: 10px">{{ scope.row.nickname?scope.row.nickname:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="姓名"  min-width='100' align="center" >
            <template slot-scope="scope">
               <span style="margin-left: 10px">{{ scope.row.trueName?scope.row.trueName:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="头像" min-width='100' align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px"><img class="avatar" :src="scope.row.imageUrl" alt=""></span>
            </template>
             </el-table-column>
            <el-table-column
            label="发生时间" min-width='100' align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.gmtCreated?formDate(scope.row.gmtCreated):'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="操作" min-width='100' align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.operatepoints?scope.row.operatepoints:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="操作"  min-width='100' align="center">
            <template slot-scope="scope">
                <span >{{ scope.row.operateMemo?scope.row.operateMemo:'--' }}</span>
            </template>
            </el-table-column>
        </el-table>
            <el-pagination
            v-if="pageCount"
             :current-page='pageIndex'
            layout="prev, pager, next"
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
            nicknameLike:'',
            pageCount: null,
            pageIndex:1,
            tableData: [],
            loading:true
        }

    },
    mounted () {
        this.getScoreList(1);
    },
    methods: {
        getScoreList(pageIndex){
            this.pageIndex = pageIndex;
            this.loading = true;
            let url = CONSTANT.URL.USER.FINDUSERPOINTS,
            param={
                nicknameLike:this.nicknameLike,
                pageIndex:pageIndex,
                pageSize:10
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
        search(e){
            if(e.keyCode == 13){
                this.getGoodList(1);
            }
        },
        formDate(num){
            return common.dateFormate(num);
        },
        // 分页
        pageSizeChange(val){
            this.pageIndex = val;
            this.getScoreList(val);
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
            width: 320px;
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
